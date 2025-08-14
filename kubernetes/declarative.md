### creating a pod using Declarative Method
#### We have 4 types of fields in the Declarative Method
```
apiVersion
Kind
metadata
spec
```

- we can create the pods by using the below
``
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod-2
  labels:
    env: test
spec:
  containers:
  - name: nginx-container
    image: nginx:latest
    ports:
    - containerPort: 80
``