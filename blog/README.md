# Blog API REST

API REST para una plataforma de blog desarrollada con Spring Boot y Java 21. Permite la gestión de publicaciones, categorías, etiquetas y usuarios con autenticación basada en JWT.

## Tecnologías

- Java 21
- Spring Boot 4.0
- Spring Security + JWT (jjwt 0.12.6)
- Spring Data JPA / Hibernate
- PostgreSQL
- Flyway
- MapStruct
- Lombok

## Requisitos

- Java 21
- PostgreSQL
- Maven

## Configuración

Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/blog.git
cd blog
```

Crea la base de datos en PostgreSQL:

```sql
CREATE DATABASE blog;
```

Configura las variables en `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/blog
spring.datasource.username=tu_usuario
spring.datasource.password=tu_password
jwt.secret=tuClaveSecretaSuperLargaYSegura
```

Ejecuta el proyecto:

```bash
mvn spring-boot:run
```

Flyway aplicará las migraciones automáticamente al iniciar.

## Endpoints principales

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | /api/v1/auth/signup | Registro de usuario | No |
| POST | /api/v1/auth/login | Inicio de sesión | No |
| GET | /api/v1/posts | Listar publicaciones | No |
| POST | /api/v1/posts | Crear publicación | Sí |
| PUT | /api/v1/posts/{id} | Actualizar publicación | Sí |
| DELETE | /api/v1/posts/{id} | Eliminar publicación | Sí |
| GET | /api/v1/categories | Listar categorías | No |
| GET | /api/v1/tags | Listar etiquetas | No |

Las rutas marcadas con **Sí** requieren el header:

```
Authorization: Bearer <token>
```