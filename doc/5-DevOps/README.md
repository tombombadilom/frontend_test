# DevOps Documentation

[← Back to Documentation](../README.md) | [View Documentation Map](../DocNavigation.md)

## Navigation

- [📋 Main README](../README.md) - Overview of the entire documentation
- [📝 Project Analysis](../Analysis.md) - Analysis of the project requirements
- [🎨 Design Brief](../DesignBrief.md) - Design and ergonomics guidelines
- [📋 Analysis Overview](../2-Analysis/README.md) - Overview of the analysis process
- [🔍 Methodology](../1-Methodology/README.md) - Research and development methodology
- [🖼️ Wireframes](../1-Design/Wireframes.md) - Wireframes for the three display modes
- [⚙️ Technical Specifications](../3-Specifications/TechnicalSpecifications.md) - Technical implementation details
- [✅ Implementation Plan](../4-Todo/README.md) - Tasks and timeline for implementation
- [🛠️ DevOps](README.md) - DevOps and deployment documentation

## Table of Contents
1. [DevOps Structure](#devops-structure)
2. [Docker](#docker)
3. [CI/CD](#cicd)
4. [Kubernetes](#kubernetes)Fortnite Item Shop
Genshin Impact Shop
World of Warcraft Shop

## DevOps Structure

The project uses the following configuration files:

```
.
├── Dockerfile              # Docker image build
├── compose.yaml           # Docker Compose configuration
├── .github
│   └── workflows
│       └── pipeline.yml   # GitHub Actions Pipeline
├── .harness
│   └── pipeline.yaml      # Harness Pipeline
├── kubernetes/            # Kubernetes manifests
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── kustomization.yaml
└── nginx.conf            # Frontend nginx configuration
```

## Docker

### Docker Image

The Docker image is built in multiple stages:

1. **Build stage**:
   - Uses Node 23 Alpine
   - pnpm installation
   - React application build

2. **Production stage**:
   - Based on nginx:1.25-alpine-slim
   - Secure configuration
   - Non-root user
   - Port 80 exposure

### Docker Compose

The `compose.yaml` file configures:

1. **Traefik**:
   - Reverse proxy
   - Automatic SSL certificate management
   - Secure dashboard

2. **Frontend**:
   - Locally built image
   - Environment variable configuration
   - Enhanced security

## CI/CD

### GitHub Actions

The GitHub Actions pipeline includes 4 jobs:

1. **lint-workflow**:
   - Workflow syntax validation
   - Used actions verification

2. **test**:
   - Unit tests
   - Code coverage
   - Code linting

3. **build-and-push**:
   - Application build
   - Docker image build
   - Push to GitHub Container Registry

4. **deploy**:
   - Kubernetes deployment
   - Deployment verification
   - Automatic rollback on failure

### Harness

The Harness pipeline follows a similar structure:

1. **test**:
   - Tests and linting
   - Coverage report

2. **build**:
   - Application build
   - Image build and push

3. **deploy**:
   - Kubernetes deployment
   - Service verification

## Kubernetes

### Configuration

Kubernetes manifests are organized with kustomize:

1. **deployment.yaml**:
   - 3 replicas
   - Limited resources
   - Enhanced security
   - Healthchecks

2. **service.yaml**:
   - ClusterIP service type
   - Port 80

3. **ingress.yaml**:
   - Traefik Ingress
   - Automatic SSL with Let's Encrypt

### Security

1. **Container**:
   - Non-root user
   - Read-only filesystem
   - Minimal capabilities

2. **Kubernetes**:
   - Network Policies
   - Pod Security Context
   - Secure secret management

### Monitoring

1. **Healthchecks**:
   - Liveness probe
   - Readiness probe
   - Startup probe

2. **Metrics**:
   - Prometheus endpoints
   - Grafana dashboards

## Local Development

### Prerequisites
- Docker
- kubectl
- kustomize
- Node.js 23
- pnpm

### Getting Started

1. **Install dependencies**:
```bash
pnpm install
```

2. **Start development environment**:
```bash
docker compose up -d
```

3. **Access the application**:
- Frontend: http://localhost
- Traefik dashboard: http://localhost:8080

### Development Commands

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Run linting
pnpm lint

# Build for production
pnpm build

# Build Docker image
docker compose build

# Deploy to Kubernetes
kubectl apply -k kubernetes/
```

## Troubleshooting

### Common Issues

1. **Docker Build Fails**:
   - Check Node.js version compatibility
   - Verify pnpm lockfile
   - Clear Docker build cache

2. **Deployment Issues**:
   - Verify Kubernetes context
   - Check pod logs
   - Verify secret configuration

3. **SSL Certificate Issues**:
   - Check DNS configuration
   - Verify Traefik logs
   - Check Let's Encrypt rate limits

### Useful Commands

```bash
# View pod logs
kubectl logs -f deployment/game-store-frontend

# Check deployment status
kubectl rollout status deployment/game-store-frontend

# View Traefik logs
kubectl logs -f -l app=traefik

# Force deployment rollback
kubectl rollout undo deployment/game-store-frontend
``` 