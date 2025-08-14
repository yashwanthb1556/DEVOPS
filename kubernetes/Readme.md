## Kubernetes Documentation

#### Why someone want kubernetes?
- Automatic Scaling
- Self healing
- cross platform compactability

**commands for deployments with number of replicas**
```
kubectl create deploy first-deploy --image=nginx --replicas=3
```
- response:
```
NAME                           READY   STATUS    RESTARTS   AGE
first-deploy-ddd45f4cc-bpn8z   1/1     Running   0          31s
first-deploy-ddd45f4cc-ms8kc   1/1     Running   0          31s
first-deploy-ddd45f4cc-wltqz   1/1     Running   0          31s
```
- If i wanted to delete one pod it will create a new pod

```
kubectl delete pod first-deploy-ddd45f4cc-bpn8z
```
- response:
```
pod "first-deploy-ddd45f4cc-bpn8z" deleted
```

- If i see the pods
```
kubectl get pods
```
- response:
```
first-deploy-ddd45f4cc-ms8kc   1/1     Running   0          7m38s
first-deploy-ddd45f4cc-qh9hj   1/1     Running   0          6s
first-deploy-ddd45f4cc-wltqz   1/1     Running   0          7m38s
```

if you observer over top we have deleted **first-deploy-ddd45f4cc-bpn8z**
but it have generated a new pod **first-deploy-ddd45f4cc-qh9hj**

```
kubectl get deploy
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
first-deploy   3/3     3            3           11m
```

we can scale up/down 
example
we are scale down the replicas

```
kubectl scale deployment first-deploy --replicas=2
```

```
kubectl get deploy                                
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
first-deploy   2/2     2            2           14m
```

we need the minikube to run the kubectl commands
**Minikube starts a virtual machine or container (depending on the driver) on your system and installs Kubernetes components inside it.**

It supports multiple VM/container drivers

What if we don't wanted to create a new deployment untill you weren't confirm,
we can just dry-run it
```
kubectl create deploy sample-nginx --image=nginx --dry-run=client -o yaml > deploy-dry-run.yaml
```
what above command do?🤔
- it will create a new file (declarative) called `deploy-dry-run.yaml`
- you can check the description before even we can apply
- response

```
// deploy-dry-run.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: sample-nginx
  name: sample-nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: sample-nginx
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: sample-nginx
    spec:
      containers:
      - image: nginx
        name: nginx
        resources: {}
status: {}

```


### Lets Learn about rollout command
ever wonder how to restart and if you restarted it then everything went messy, what. what. whaaaat?
don't worry we have the hero below
#### ROLLOUT

we can do the restart
```
kubectl rollout restart  deploy sample-nginx 
```

we can do undo
```
kubectl rollout undo  deploy sample

```

we can do see the history
```
kubectl rollout history  deploy sample-nginx
```

- If we wanted to see the ip
```
kubectl get po -o wide
```
- response
```
NAME                                    READY   STATUS    RESTARTS   AGE    IP            NODE       NOMINATED NODE   READINESS GATES
nginx-pod-deployment-666675f494-ffsgs   1/1     Running   0          7m7s   10.244.0.34   minikube   <none>           <none>
nginx-pod-deployment-666675f494-q4d8r   1/1     Running   0          7m7s   10.244.0.33   minikube   <none>           <none>
nginx-pod-deployment-666675f494-rgvgj   1/1     Running   0          7m7s   10.244.0.35   minikube   <none>    
```

can we use curl 10.244.0.34:80 ?
try once you wont get anything

if we are deployed meant we are not deployed totally
we need to expose it 

- for expose
```
kubectl expose deploy <deployment-name> --port=80
```

- see the services

```
kubectl get svc
```
- response
```
NAME                   TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
kubernetes             ClusterIP   10.96.0.1        <none>        443/TCP   7d
nginx-pod-deployment   ClusterIP   10.109.186.251   <none>        80/TCP    4s
```

can we do curl 10.109.186.251:80 what we get? Nothing
- why?
- because, it is the cluster ip which is used for the internal usage only not outside for that we
- neeed to deploy to the type NodeType


- we have listed the service successfully how to access it?
```
minikube service list
```
- response
```
---------|----------------------|--------------|-----|
|  NAMESPACE  |         NAME         | TARGET PORT  | URL |
|-------------|----------------------|--------------|-----|
| default     | kubernetes           | No node port |     |
| default     | nginx-pod-deployment | No node port |     |
| kube-system | kube-dns             | No node port |     |
|-------------|----------------------|--------------|-----|
```

if we oberve no node port assigned
- we need the url 

```
minikube service nginx-pod-deployment --url
😿  service default/nginx-pod-deployment has no node port
❗  Services [default/nginx-pod-deployment] have type "ClusterIP" not meant to be exposed, however for local development minikube allows you to access this !
http://127.0.0.1:50663
❗  Because you are using a Docker driver on darwin, the terminal needs to be open to run it.
```
- here we go the service is up