/* Calculadora de subneteo IPv4 y generador de pool DHCP Cisco (compañero de las prácticas .pkt) */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.PacketTracerTools = factory();
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  function ipToInt(ip) {
    var p = String(ip || '').trim().split('.');
    if (p.length !== 4) return null;
    var v = 0;
    for (var i = 0; i < 4; i++) {
      if (!/^\d{1,3}$/.test(p[i])) return null;
      var n = Number(p[i]);
      if (n > 255) return null;
      v = ((v << 8) | n) >>> 0;
    }
    return v;
  }

  function intToIp(v) {
    v = v >>> 0;
    return [(v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, v & 255].join('.');
  }

  function calculateSubnet(ipStr, prefix) {
    var ip = ipToInt(ipStr);
    var p = Number(prefix);
    if (ip === null) return { ok: false, error: 'Dirección IPv4 inválida.' };
    if (!Number.isInteger(p) || p < 0 || p > 32) return { ok: false, error: 'El prefijo CIDR debe estar entre 0 y 32.' };
    var mask = p === 0 ? 0 : (0xffffffff << (32 - p)) >>> 0;
    var wildcard = (~mask) >>> 0;
    var network = (ip & mask) >>> 0;
    var broadcast = (network | wildcard) >>> 0;
    var total = Math.pow(2, 32 - p);
    var usable = p <= 30 ? total - 2 : (p === 31 ? 2 : 1);
    return {
      ok: true,
      cidr: intToIp(network) + '/' + p,
      network: intToIp(network),
      mask: intToIp(mask),
      wildcard: intToIp(wildcard),
      broadcast: intToIp(broadcast),
      firstHost: p <= 30 ? intToIp(network + 1) : intToIp(network),
      lastHost: p <= 30 ? intToIp(broadcast - 1) : intToIp(broadcast),
      totalAddresses: total,
      usableHosts: usable
    };
  }

  function generateCiscoDhcp(opts) {
    var o = opts || {};
    var sub = calculateSubnet(o.networkIp, o.prefix);
    if (!sub.ok) return sub;
    var poolName = String(o.poolName || 'LAN_UTN').replace(/\s+/g, '_');
    var gw = o.gateway || sub.firstHost;
    var dns = o.dns || '8.8.8.8';
    var excludeEnd = o.excludeEnd || gw;
    var cli = [
      'configure terminal',
      'ip dhcp excluded-address ' + sub.firstHost + ' ' + excludeEnd,
      'ip dhcp pool ' + poolName,
      ' network ' + sub.network + ' ' + sub.mask,
      ' default-router ' + gw,
      ' dns-server ' + dns,
      'exit',
      'end'
    ].join('\n');
    return { ok: true, subnet: sub, cli: cli };
  }

  return { ipToInt: ipToInt, intToIp: intToIp, calculateSubnet: calculateSubnet, generateCiscoDhcp: generateCiscoDhcp };
});
