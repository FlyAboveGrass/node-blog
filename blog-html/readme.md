## nginx 的静态资源

1. 通过本地 http-serve -p 8001 起服务
2. 负责提供 node 接口服务，端口为 8000
3. 接口名称有变化，其他 blog 目录要注意调试
4. 本地安装好 nginx 后，配置 conf 文件，参考 该文件夹下的 nginx.conf
5. nginx.conf 主要修改了以下：

```
server {
        # 这里的nginx服务的端口
        listen       8080;
        # 监听localhost，浏览器访问localhost:端口，实际上访问下面的 location 对应的资源
        server_name  localhost;

	location / {
        # 8001 是 http-serve 提供HTML静态资源
		proxy_pass http://localhost:8001/;
	}
	location /api/ {
        # 8000是node提供接口服务
		proxy_pass http://localhost:8000;
        # 端口后面是否带斜杠
        # 有： 访问 http://localhost:8080/api/blog/list，实际是 http://localhost:8000/blog/list
        # 没有：访问 http://localhost:8080/api/blog/list，实际是 http://localhost:8000/api/blog/list
		proxy_set_header Host $host;
        # 加了上面这句后，通过nginx转发的接口header里面，在node服务里就可以获取到真正的地址，包含端口
	}
```

5. 访问 localhost:8080 查看效果
