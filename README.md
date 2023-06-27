# Hexagonal Architecture Template

> The main idea of this template is avoid the effort to create new projects with design pattern from "scratch". You can simple clone this repository and start your project based in Clean Architecture, Domain driven design, Hexagonal Architecture and SOLID concepts. This template is recommend for people who already have experience with Domain driven design and Hexagonal Architecture.

# The benefits

- Loose the coupling between modules
- Write the application specs and schema validators at the same time
- Code to the interface and not to the functions
- The business separated from the rest, gain ease by refactoring the code
- Low learning curve because of DTO's and typed language
- Easily change your adapters like storages, libs, message queues...
- Gain more security in the process of coding and in the code
- Create unit tests and integrated tests to validate your application logic by mocking the implementation

![Domain-Driven Hexagon](assets/images/DomainDrivenHexagon.png)

# The folder structure

        .
        ├── .github # Github Actions configuration
        ├── app # The app script configuration entry point
        ├── src # Source files
        │  ├── adapter # Adapters
        │  │   ├── primary # Primary adapters (https, CLI adapters...)
        │  │   │  ├── example # The adapter example folder, can have the domain name that contains the exposed https port for example (users)
        │  │   │  ├── spec # Documentation and schema validations
        │  │   ├── secondary # Secondary adapters (storage, message queue services, external API's...)
        │  ├── domain # Domain folder, responsible for domain rules layer.
        ├── test # Automated tests
        ├── app.yaml # Google Cloud Platform configuration file (app engine)
        ├── index.ts # Only responsible to call configuration script and start the entire application
        ├── README.md
        └── ... # Other files for project layout configuration and development
