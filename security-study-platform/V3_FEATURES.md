# Security Study Platform v3

## Learning
- PWA / offline study mode
- Integrated search
- Bookmarks and subject progress
- JSON backup / restore
- Spaced repetition review queue
- 10-question timed mock exam
- SIEM correlation and WAF triage defensive labs
- Network / subnet / firewall / troubleshooting labs
- Interview preparation

## Operations
- Express 5 server
- Health and metrics APIs
- Managed server restart status
- Manual / crash / health-check auto restart
- Graceful shutdown
- Docker health check

## Quality
- ESLint
- Prettier
- Vitest unit tests
- Playwright Chromium E2E tests
- Lighthouse performance/accessibility/best-practices/SEO gates

## Security / Supply Chain
- CodeQL
- Dependency Review
- Dependabot for GitHub Actions, npm, and Docker
- SBOM generation
- GitHub artifact attestation on trusted main builds
- Security headers and local-only restart control API

## CI/CD
- Build and verify homepage on every PR/feature branch
- Build Docker image on every PR
- Publish GHCR image on main only
- Publish verified homepage to GitHub Pages on main only
- Main pipeline failure GitHub Issue reporting
- Manual validated release workflow
