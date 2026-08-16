# Security Policy

## Supported version
Security Study Platform v3.x is the actively maintained line.

## Reporting
Do not publish secrets, access tokens, private logs, credentials, or exploitable proof-of-concept payloads in public issues. Use private security reporting when enabled or contact the repository owner privately.

## Security design
- Server control API binds to `127.0.0.1` only.
- `RESTART_TOKEN` can protect restart/status/start/stop commands.
- Security headers are added by the Node.js server.
- GitHub Actions performs CodeQL, dependency review, lint/unit/E2E tests, SBOM generation, container build verification, and artifact provenance on trusted deployment events.
- Training labs are defensive and focus on detection, classification, remediation, and incident response rather than exploit execution.
