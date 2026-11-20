# Prácticas de Cisco Packet Tracer (Redes, WAN, SubNeteo y DHCP)

Colección de **12 topologías `.pkt`**, hojas de cálculo de subneteo, capturas de configuración de servidor DHCP y una **herramienta web interactiva de subneteo IPv4 y generación de pools DHCP Cisco IOS**.

## Contenido del repositorio

| Recurso | Descripción |
| --- | --- |
| [`ConexionesInalámbricas.pkt`](ConexionesInalámbricas.pkt) | Práctica de redes inalámbricas (AP / Wi-Fi) |
| [`ConexiónDeRouters(WAN).pkt`](ConexiónDeRouters(WAN).pkt) | Interconexión de routers en enlaces WAN |
| [`EJEMPLO.pkt`](EJEMPLO.pkt) | Topología de ejemplo con reglas de red / filtrado |
| [`ExamAndres.pkt`](ExamAndres.pkt), [`ExamenDesarrolloDavid.pkt`](ExamenDesarrolloDavid.pkt), [`Gabriel Peña.pkt`](Gabriel%20Pe%C3%B1a.pkt), [`Practica_Examen.pkt`](Practica_Examen.pkt) | Laboratorios y exámenes prácticos de enrutamiento y conmutación |
| [`practica.pkt`](practica.pkt), [`practica2.pkt`](practica2.pkt), [`prácticaRápida.pkt`](pr%C3%A1cticaR%C3%A1pida.pkt) | Ejercicios prácticos de configuración en Packet Tracer |
| [`Práctica DHCP server CPT - TeleInfo1/`](Pr%C3%A1ctica%20DHCP%20server%20CPT%20-%20TeleInfo1/) | Topología `prácticaDHCP.pkt`, hoja `PrácticaTeleInfo1.xlsx` y capturas de configuración DHCP |
| [`Stándart de SubNeteo/`](St%C3%A1ndart%20de%20SubNeteo/) | Guía `EstándartDeSubNeteo.xlsx` y topología `ejemploAplicadoDelEstándartDeSubRed.pkt` |
| [`web-tools/index.html`](web-tools/index.html) | Calculadora IPv4 CIDR + generador de CLI `ip dhcp pool` (tema claro/oscuro e historial en `localStorage`) |
| [`web-tools/tests/subnet-dhcp.test.mjs`](web-tools/tests/subnet-dhcp.test.mjs) | Pruebas automatizadas en Node (`node --test`) |

## Compatibilidad con Cisco Packet Tracer (8.2.x / 9.x)

- **Apertura en versiones recientes (compatible):** los archivos `.pkt` creados en versiones 6.x / 7.x pueden abrirse en **Cisco Packet Tracer 8.2.x y 9.0** gracias a la retrocompatibilidad del formato.
- **Al guardar en 8.2.x / 9.x:** el formato interno se actualiza a la versión reciente y deja de ser compatible con Packet Tracer 6.x/7.x. Conviene conservar una copia si necesitas abrirlos en una versión antigua.
- **Dispositivos legacy y CLI:** si alguna práctica antigua utiliza routers o switches clásicos (`1841`, `2811`, `2950`), Packet Tracer 8.2/9.x los carga normalmente; además, la CLI DHCP que genera `web-tools/index.html` (`ip dhcp excluded-address`, `ip dhcp pool`, `network`, `default-router`, `dns-server`) es 100% compatible con Cisco IOS 15.x en routers modernos (`2911`, `4321`, `4331`).
- *Nota de verificación:* los binarios `.pkt` se conservaron intactos (sin Packet Tracer GUI instalado en el entorno de CI local); la calculadora de subredes y generador DHCP se validaron con Node 24 (`node --test`).

## Uso rápido de la herramienta web y pruebas

1. Abre [`web-tools/index.html`](web-tools/index.html) en tu navegador para calcular subredes IPv4, máscaras wildcard, rangos útiles y comandos DHCP Cisco IOS.
2. Ejecuta las pruebas unitarias:
   ```powershell
   node --test web-tools/tests/subnet-dhcp.test.mjs
   ```

<!-- local-development:start -->
## Desarrollo local

Consulta [RUNNING.md](RUNNING.md) para ubicar cada componente, abrirlo en su IDE, compilarlo y conocer las comprobaciones realizadas y los requisitos pendientes.
<!-- local-development:end -->
