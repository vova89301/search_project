This example shows how to add authentication in a Ingress rule using a secret that contains a file generated with htpasswd. It's important the file generated is named auth (actually - that the secret has a key data.auth), otherwise the ingress-controller returns a 503.

$ htpasswd -c auth foo
New password: <bar>
New password:
Re-type new password:
Adding password for user foo

$ kubectl create secret generic basic-auth --from-file=auth
secret "basic-auth" created

$ kubectl get secret basic-auth -o yaml
apiVersion: v1
data:
  auth: <top_secret> 
kind: Secret
metadata:
  name: basic-auth
  namespace: default
type: Opaque

echo "
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-with-auth
  annotations:
    # type of authentication
    nginx.ingress.kubernetes.io/auth-type: basic
    # name of the secret that contains the user/password definitions
    nginx.ingress.kubernetes.io/auth-secret: basic-auth
    # message to display with an appropriate context why the authentication is required
    nginx.ingress.kubernetes.io/auth-realm: 'Authentication Required - foo'
spec:
  ingressClassName: nginx
  rules:
  - host: foo.bar.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service: 
            name: http-svc
            port: 
              number: 80
" | kubectl create -f -
