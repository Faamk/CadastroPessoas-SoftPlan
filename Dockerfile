FROM timbru31/java-node

ADD cadastro-back/target /app/cadastro-back

ADD frontend/build /app/frontend

ADD script.sh  /app

EXPOSE 5000 8080

WORKDIR /app

RUN chmod +x /app/script.sh

ENTRYPOINT ["/bin/bash", "/app/script.sh"]
