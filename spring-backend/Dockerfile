FROM openjdk

EXPOSE 8080
VOLUME /tmp
COPY target/api-0.0.1-SNAPSHOT.jar app.jar

CMD ["java", "-jar", "/app.jar"]