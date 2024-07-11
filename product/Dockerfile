FROM eclipse-temurin:17-jdk-alpine

WORKDIR /cdss
COPY . .
RUN mvn clean install

CMD mvn spring-boot:run