# Stage 1: Build
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline -B
COPY src/ src/
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
RUN addgroup --system cobuild && adduser --system --ingroup cobuild cobuild
USER cobuild
COPY --from=build /app/target/cobuild-api-*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
