### Secret
```
kubectl create secret generic demo-secret --from-literal=password=admin
```
**Output**
```
secret/demo-secret created
```

**cmd**
```
kubectl get secret
```
**Output**
```
NAME          TYPE     DATA   AGE
demo-secret   Opaque   1      11s
```

**cmd**
```
kubectl describe secret demo-secret
```
**Output**
```
Name:         demo-secret
Namespace:    default
Labels:       <none>
Annotations:  <none>

Type:  Opaque

Data
====
password:  5 bytes
```

**cmd**
```
kubectl get secret demo-secret -o yaml > demo-secret.yaml
```
**Output**
```
will gives the files to the folder named demo-secret.yaml
```