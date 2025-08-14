## Imperative Method

#### Listing the commands

#### Running the Image for the pod creation of Nginx
- cmd: `kubectl run --image=nginx nginx-pod`
- response: `pod/nginx-pod created`
- cmd: `kubectl get pods`
- response: 
``
NAME            READY   STATUS    RESTARTS   AGE
nginx-pod-new   1/1     Running   0          68s
``
- cmd: `kubectl logs -f nginx-pod`
- response: you will get real time logs
``
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
2025/06/29 11:47:15 [notice] 1#1: using the "epoll" event method
2025/06/29 11:47:15 [notice] 1#1: nginx/1.29.0
2025/06/29 11:47:15 [notice] 1#1: built by gcc 12.2.0 (Debian 12.2.0-14+deb12u1) 
2025/06/29 11:47:15 [notice] 1#1: OS: Linux 6.6.87.2-microsoft-standard-WSL2
2025/06/29 11:47:15 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
2025/06/29 11:47:15 [notice] 1#1: start worker processes
2025/06/29 11:47:15 [notice] 1#1: start worker process 29
2025/06/29 11:47:15 [notice] 1#1: start worker process 30
2025/06/29 11:47:15 [notice] 1#1: start worker process 31
2025/06/29 11:47:15 [notice] 1#1: start worker process 32
2025/06/29 11:47:15 [notice] 1#1: start worker process 33
2025/06/29 11:47:15 [notice] 1#1: start worker process 34
2025/06/29 11:47:15 [notice] 1#1: start worker process 35
2025/06/29 11:47:15 [notice] 1#1: start worker process 36
``

- cmd: `kubectl describe pods/nginx-pod-new`
- response: 
``
Name:             nginx-pod-new
Namespace:        default
Priority:         0
Service Account:  default
Node:             minikube/192.168.49.2
Start Time:       Sun, 29 Jun 2025 17:16:23 +0530
Labels:           run=nginx-pod-new
Annotations:      <none>
Status:           Running
IP:               10.244.0.5
IPs:
  IP:  10.244.0.5
Containers:
  nginx-pod-new:
    Container ID:   docker://2b638bddff3626eb5c9942cefe04d4ca61a957e51226f5f69ec6c88742e74e95
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:dc53c8f25a10f9109190ed5b59bda2d707a3bde0e45857ce9e1efaa32ff9cbc1
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Sun, 29 Jun 2025 17:17:14 +0530
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-9lv2x (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True
  Initialized                 True
  Ready                       True
  ContainersReady             True
  PodScheduled                True
Volumes:
  kube-api-access-9lv2x:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  7m    default-scheduler  Successfully assigned default/nginx-pod-new to minikube
  Normal  Pulling    7m    kubelet            Pulling image "nginx"
  Normal  Pulled     6m9s  kubelet            Successfully pulled image "nginx" in 47.575s (47.575s including waiting). Image size: 192226221 bytes.
  Normal  Created    6m9s  kubelet            Created container: nginx-pod-new
  Normal  Started    6m9s  kubelet            Started container nginx-pod-new
``
#### we can generate the yaml from the below command
- cmd: `kubectl get pod nginx-pod-new -o yaml`
- response:
``
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: "2025-06-29T11:46:23Z"
  labels:
    run: nginx-pod-new
  name: nginx-pod-new
  namespace: default
  resourceVersion: "3030"
  uid: 456d3bbd-47ca-460f-80b1-62d9cd267526
spec:
  containers:
  - image: nginx
    imagePullPolicy: Always
    name: nginx-pod-new
    resources: {}
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: kube-api-access-9lv2x
      readOnly: true
  dnsPolicy: ClusterFirst
  enableServiceLinks: true
  nodeName: minikube
  preemptionPolicy: PreemptLowerPriority
  priority: 0
  restartPolicy: Always
  schedulerName: default-scheduler
  securityContext: {}
  serviceAccount: default
  serviceAccountName: default
  terminationGracePeriodSeconds: 30
  tolerations:
  - effect: NoExecute
    key: node.kubernetes.io/not-ready
    operator: Exists
    tolerationSeconds: 300
  - effect: NoExecute
    key: node.kubernetes.io/unreachable
    operator: Exists
    tolerationSeconds: 300
  volumes:
  - name: kube-api-access-9lv2x
    projected:
      defaultMode: 420
      sources:
      - serviceAccountToken:
          expirationSeconds: 3607
          path: token
      - configMap:
          items:
          - key: ca.crt
            path: ca.crt
          name: kube-root-ca.crt
      - downwardAPI:
          items:
          - fieldRef:
              apiVersion: v1
              fieldPath: metadata.namespace
            path: namespace
status:
  conditions:
  - lastProbeTime: null
    lastTransitionTime: "2025-06-29T11:47:15Z"
    status: "True"
    type: PodReadyToStartContainers
  - lastProbeTime: null
    lastTransitionTime: "2025-06-29T11:46:23Z"
    status: "True"
    type: Initialized
  - lastProbeTime: null
    lastTransitionTime: "2025-06-29T11:47:15Z"
    status: "True"
    type: Ready
  - lastProbeTime: null
    lastTransitionTime: "2025-06-29T11:47:15Z"
    status: "True"
    type: ContainersReady
  - lastProbeTime: null
    lastTransitionTime: "2025-06-29T11:46:23Z"
    status: "True"
    type: PodScheduled
  containerStatuses:
  - containerID: docker://2b638bddff3626eb5c9942cefe04d4ca61a957e51226f5f69ec6c88742e74e95
    image: nginx:latest
    imageID: docker-pullable://nginx@sha256:dc53c8f25a10f9109190ed5b59bda2d707a3bde0e45857ce9e1efaa32ff9cbc1
    lastState: {}
    name: nginx-pod-new
    ready: true
    restartCount: 0
    started: true
    state:
      running:
        startedAt: "2025-06-29T11:47:14Z"
    volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: kube-api-access-9lv2x
      readOnly: true
      recursiveReadOnly: Disabled
  hostIP: 192.168.49.2
  hostIPs:
  - ip: 192.168.49.2
  phase: Running
  podIP: 10.244.0.5
  podIPs:
  - ip: 10.244.0.5
  qosClass: BestEffort
  startTime: "2025-06-29T11:46:23Z"
``