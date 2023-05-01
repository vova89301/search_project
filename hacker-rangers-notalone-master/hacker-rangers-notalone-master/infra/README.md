List of used opensource solutions:

- ArgoCD
    ArgoCD helm chart repo:
    https://github.com/argoproj/argo-helm/tree/main/charts/argo-cd
- HTTPS cert management
    We're using cert-manager helm chart
    ```helm repo add jetstack https://charts.jetstack.io```
- Redis
    We're using Bitnami Redis helm chart
    ```helm repo add bitnami https://charts.bitnami.com/bitnami```
- Tekton pipelines
    We're using Teknot to build and push images to the docker registry
    https://tekton.dev/docs/installation/pipelines/

    links to the sources:
    https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
    https://storage.googleapis.com/tekton-releases/triggers/latest/release.yaml
    https://storage.googleapis.com/tekton-releases/triggers/latest/interceptors.yaml
    dashboard to run pipelines from UI (and track build progress in the fancy UI)
    https://storage.googleapis.com/tekton-releases/dashboard/latest/release.yaml
- PostgreSQL
    We're using Bitnami Redis helm chart
    ```helm install my-release stable/postgresql```
- Docker registry
    https://github.com/Joxit/docker-registry-ui
- OpenID server
    Cool implementation of OpenID server with admin UI, we're using it for our auth and user management
    https://github.com/skoruba/IdentityServer4.Admin