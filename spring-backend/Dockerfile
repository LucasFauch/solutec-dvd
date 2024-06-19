FROM maven AS build

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean install -DskipTests

FROM openjdk

EXPOSE 8080
VOLUME /tmp
COPY --from=build /app/target/api-0.0.1-SNAPSHOT.jar app.jar

CMD ["java", "-jar", "/app.jar"]