import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const T = require('../subnet-dhcp.js');

test('calculates IPv4 /26 subnet accurately', () => {
  const s = T.calculateSubnet('192.168.10.70', 26);
  assert.equal(s.ok, true);
  assert.equal(s.network, '192.168.10.64');
  assert.equal(s.mask, '255.255.255.192');
  assert.equal(s.wildcard, '0.0.0.63');
  assert.equal(s.broadcast, '192.168.10.127');
  assert.equal(s.firstHost, '192.168.10.65');
  assert.equal(s.lastHost, '192.168.10.126');
  assert.equal(s.usableHosts, 62);
});

test('rejects invalid input and handles /31 /32 edge cases', () => {
  assert.equal(T.calculateSubnet('999.1.1.1', 24).ok, false);
  assert.equal(T.calculateSubnet('10.0.0.1', 33).ok, false);
  assert.equal(T.calculateSubnet('10.0.0.1', 31).usableHosts, 2);
  assert.equal(T.calculateSubnet('10.0.0.1', 32).usableHosts, 1);
});

test('generates Cisco IOS DHCP pool CLI', () => {
  const res = T.generateCiscoDhcp({ networkIp: '10.20.0.0', prefix: 24, poolName: 'WIFI LAB', dns: '1.1.1.1' });
  assert.equal(res.ok, true);
  assert.ok(res.cli.includes('ip dhcp pool WIFI_LAB'));
  assert.ok(res.cli.includes('network 10.20.0.0 255.255.255.0'));
  assert.ok(res.cli.includes('default-router 10.20.0.1'));
  assert.ok(res.cli.includes('dns-server 1.1.1.1'));
});
