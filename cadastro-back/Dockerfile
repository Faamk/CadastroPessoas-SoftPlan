FROM openjdk:8-jdk-alpine

RUN apk add --update \
		maven \
		make

COPY pom.xml .
RUN mvn package -Dmaven.test.skip=true
