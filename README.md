<p align="center">
<br />
<br />
<img src="assets/readme/product-logo.jpg" width="500px" align="center" alt="Template Hexagonal" />
</p>
<p align="center">

[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](README.pt-br.md)

## Topics

1. [ What is the purpose of this template? ](#what-is-the-purpose-of-this-template)
2. [ What is Hexagonal? ](#what-is-hexagonal)
3. [ Technology and structures ](#technologies-and-structures)
4. [ Running the project in the local environment ](#running-the-project-in-the-local-environment)
5. [ How to create new features in the project using Hexagonal ](#how-to-create-new-features-in-the-project-using-hexagonal)
6. [ How to create a primary adapter in the project using Hexagonal? ](#how-to-create-a-primary-adapter-in-the-project-using-hexagonal)
7. [ How to create a secondary adapter in the project using Hexagonal? ](#how-to-create-a-secondary-adapter-in-the-project-using-hexagonal)
8. [ Versioning pattern ](#versioning-pattern)
9. [ Technical debits ](#technical-debits)
10. [ Contributors ](#contributors)
11. [ Devops ](#devops)

<br />

## What is the purpose of this template?

The purpose of this template is to make it easier to create a new project using Alistair Cockburn's Ports and Adapters architecture.

## What is Hexagonal?

### We have divided our hexagonal structure into three parts:

We can say in a simple way that the Hexagonal architecture is divided into three parts, they are:

1. Center of the hexagon
2. Left side of the hexagon (Primary adapters)
3. Right side of the hexagon (Secondary adapters)

### In the center of the hexagon:

In the center of the hexagon we have concentrated the entire application layer, which in itself represents the business rules and business models. This layer is intended to be isolated from the others, so that the business rule remains intact

### On the right, secondary adapters:

The secondary adapters represent the infrastructure part of the application. The activities that are contained in the secondary adapters are, for example: Writing to a bank, sending a message to queues, uploading an image to buckets and so on...

### To the left of the hexagon, primary adapters:

The primary adapters represent our clients that will connect to the application, whether through an HTTP request or a CLI interface.

### Ports:

The ports are the gateway communication between the center of your hexagon with the left and right sides of your hexagon, with the external sides. They are nothing more than the methods that classes implement through an interface.

### Adapters:

The adapters are the users of the ports. For each port that your hexagon has, an adapter must be created, so you have the freedom to modify and delete it dynamically

### Flow of a standard request in the Hexagonal Architecture:

In the users of our application we have the drivers of the action, which will use the primary adapters, and this will "knock" on the primary ports. These, in turn, will hit the application layer using the service layer to execute business rules. Thus, the secondary ports and adapters will conduct the action to the end of the application flow.

<br />

More information about Hexagonal architecture:

- [Alistair Cockburn - Founder of Hexagonal](https://alistair.cockburn.us/hexagonal-architecture/)

<br />

[(Back to top)](#topics)

<br />

## Technologies and structures

Today we have the hexagonal architecture represented as follows:
![Nodejs](assets/readme/hexagonal-structure.png)

<br />

[(Back to top)](#topics)

<br />

We used some of the following technologies within the project:
![Nodejs](https://skillicons.dev/icons?i=nodejs,typescript,prisma,github)

<br />

## Running the project in the local environment

To run the project locally, just follow the instructions listed below. It is important to pay attention to what is mandatory.

### > Installation

Below you can follow the instructions needed to run this project locally.

1. Clone the API repository
   ```sh
   git clone https://github.com/gcmonteiro02/hexagonal-fastify-prisma-githubactions-gcp-template
   ```
2. Install the packages from the API repository using npm
   ```sh
   npm i
   ```
3. Set the environment variables to run the project locally, they are separated by environment, in the following directory: [resources](resources)
   ```yml
   DATABASE_URL: ${value}
   PORT: ${value}
   GCP_PROJECT: ${value}
   GCP_SA_KEY: ${value}
   ```
4. After executing the above items, you need to run the following script:
   ```sh
   npm run dev
   ```
   <br />

[(Back to top)](#topics)

## How to create new features in the project using Hexagonal

### Feature: Fetch a new User from the database.

We can think a bit about this feature before building it. Here are some cases to think about:

- \_Where does the user's search request come from?
  If, for example, the search request comes directly from one of our clients and the communication is via HTTP Rest, then we can add the primary adapter ([src/adapter/primary/http/rest](src/adapter/primary/http/rest/user/routes.ts)), where this adapter will interface with the ports responsible for this communication with the application/services layer ([src/core/domain/user/port](src/core/domain/user/port.ts)). In short, all the applications that need to connect to our API will be destined for the left side of the Hexagon, i.e. they will always be primary adapters. Basically, these primary adapters are our users, be they end customers, products that need access to our API or even CLI's depending on the case. So again, everything that connects to our application and demands data can be considered primary adapters.
  <br />

- _We need to manipulate the user's data? for example, format it for a different model..._
  We understand in this example that this is part of the application's business rule, so this condition needs to be within the application layer, more precisely in the services and domain layer, which is where the application's business rules are located ([src/core/domain/user/service](src/core/domain/user/service.ts), [src/core/domain/user/user](src/core/domain/user/user.ts)).

  In this way, the primary adapter, which in our case is the client (frontend app that the end consumer is using) will communicate through the ports and reach the service and domain layers through them, strictly respecting what the ports say.

  The flow of a request within the Hexagonal architecture is generally from the primary adapter, through the application layer and to the secondary adapters, after which the request is returned in the form of a response to the primary adapter that carried out the action.

  Returning to our answer to our question, the formatting of the data takes place within the application layer, more precisely in the services layer, as it is a business rule.

  We always need to keep the business rule within the application layer, because remember, adapters are replaceable, so we need to leave our business rule isolated.

  By respecting the behavior described above, we guarantee that we will always receive what we expect, because the ports are responsible for the data that the application layer needs.

  Regardless of who connects to the application layer (whatever the primary adapter, if it doesn't respect the ports, it won't connect to our application). Any secondary adapter can be replaced easily, as its successor will only need to implement the ports that the previous one did.

<br />

- _We need to save a log inside the application, recording that this search was carried out by our client, so what?_
  Here we'll be talking about secondary adapters ([src/adapter/secondary](src/adapter/secondary)). Secondary adapters are seen as the infrastructure part of the application, so they include databases, queues, libs and so on.

  If we need to save a log inside the database, then we'll have to get our application layer to request the secondary adapters to perform this activity.

  The request comes from the primary adapter, passes through the ports, reaches the application layer, which in turn reaches the secondary adapter.

  The benefit of all this is that it gives us the guarantee that this secondary adapter, by respecting the ports, is able to execute everything that the application layer needs. Here we segregate infrastructure operations from business rules.

<br />

### Implementing the feature, step by step:

We can understand that the process of creating a feature in the hexagonal architecture in this project consists of the following steps:

    1. Understanding what we actually need to create for the new feature
    2. Create the ports and DTOs that are needed
    3. Create test cases for the ports and adapters (ideal)
    4. Create the adapters and implement the ports that have been established by them
    5. Communicate the adapters with the ports and also the service layers with the adapters.
    6. Adjust the application's pre-configuration typing, what it will need to meet the new feature (new primary and secondary adapters and so on...)
    7. Create the adapter documentation

<br />

Getting started:

1. Let's assume that the User domain doesn't yet exist within the application, so let's create it in the path [src/core/domain](src/core/domain) :

   <br />

   <img src="assets/readme/user-domain-folder.png" width="300">

   <br />

   Domains by definition have at least one file, which is the one that represents them. In the case of User, we have `user.ts`. This is because a domain may not have business rules, but exist within the application and be part of other business rules.

   In our example, we will also create the file `port.ts` and `service.ts`, which will respectively represent the ports of the User domain (used by the adapters) and the business rules of the User domain (usually DTO's). These files are repeated between domains.

   <br />

2. After structuring the User domain folder, let's now create the primary and secondary ports, and the respective DTOs that act within them:
   The DTO in this case is what our `get` port will always request for all primary adapters that try to connect to it:

   <br />
   > (id: string)
   <br />

   <img src="assets/readme/user-port.png" width="400">

   <br />

   We have `PrimaryHttpPort`, which is the interface that represents the primary ports that are open to the primary adapters. In our case, we're working with HTTP/REST ports. If we have another need, for example other types of primary adapters connecting to our User domain, then we will have to have separate interfaces to represent these other ports, for example `PrimaryCLIPort`, where this port will only have the methods corresponding to the need of that type of primary adapter.

   Another detail we can observe is the return from this port, which in itself tells us exactly what it will return after being triggered, working in a kind of <I,O>. The visualization is much clearer in relation to the business rule we have implemented. As well as maintenance, for a new developer who is coming to the project to manage the features, they just need to be aware of which ports exist and what they expect as input and return as output.

   In this feature, we're also going to search the database, so we need to create the secondary ports that will be used by the secondary adapters. Let's create an interface called `SecondaryStoragePort`, for example, with a method called `getUserById` to represent them:

     <br />

     <img src="assets/readme/user-secondary-port.png" width="400">

     <br />

   Therefore, in the future we will require that the secondary adapters that connect to our application implement these ports, which in turn are represented by our methods, through this secondary port, represented by this `SecondaryStoragePort` interface. The secondary adapter will be of the Storage type, as we need the bank to hold user information.

   Following the same concept as the primary ports, if we have another context within the secondary adapters that reaches the `User` domain, we will have to create other separate ports. An example would be if we needed to send the user to a queue, then we would have to create an interface called `UserSecondaryMessageQueuePort` to represent only the ports that are destined for that specific secondary adapter.

     <br />

3. After creating the primary and secondary ports as well as the DTOs, we now have enough resources to create test cases, for example. All we need to do is import the ports and DTOs to define them, since we're programming for the interface and not the methods. However, in this example, we won't be creating test cases in order to speed up the practical example.

   <br />

<!-- [(Voltar para cima)](#tópicos) -->

4. Now the next step is to implement the ports in the service layer:

   <br />
   <img src="assets/readme/user-service.png" width="400">
   <br />

   The `UserService` class implements the ports contained in `UserPrimaryHttpPort`. Thus, the interface that represents the ports will require this class to implement the methods that have been created, in this case, the ports themselves. Once the primary adapters have been injected with a dependency on the `UserService`, we'll ensure that they have access to the ports they need, and in parallel we'll ensure that the DTOs that are defined by the ports pass through.
   <br />

5. Now let's get our secondary adapter to implement the secondary ports. This is because we need to ensure that they implement the secondary ports that our application layer needs in order to function. Remember that for this example, these ports are the representation of the bank methods, in the case of reading, writing and so on.

   After exporting the `SecondaryStoragePort`, let's make the secondary adapter, in our case the `ExampleStorage` [src/adapter/secondary/storage/example/ExampleStorage.ts](src/adapter/secondary/storage/example/ExampleStorage.ts) that was chosen to connect to the application respect it. We'll see that our secondary adapter already implements another port from another domain, so we just need to add one more.

   <br />
   <img src="assets/readme/secondary-user-port-imported.png" width="400">
   <br />

   Now `ExampleStorage`, the secondary adapter, implements the ports that the `SecondaryStoragePort` interface represents (ports that are dictated by our application layer).

   <br />
   <img src="assets/readme/secondary-get-user-method.png" width="400">
   <br />

   In this way, the class implements the methods of this interface and guarantees that it will meet the needs of our application layer.
   Now we just need to make our service layer contact the secondary adapters, through dependency injection and using the ports.

   <br />
   <img src="assets/readme/primary-get-user-method.png" width="400">
   <br />

   To follow the example, I've added a small business rule, which must be in the service layer:

    <br />
    <img src="assets/readme/business-rule.png" width="400">
    <br />

6. Now that we have the primary and secondary ports, DTO's, and secondary adapters ready, we can create the primary adapters that will be the protagonists in relation to the use of all these items [src/adapter/primary/http/rest/user](src/adapter/primary/http/rest/user):

   <br />
   <img src="assets/readme/primary-user-get-adapter.png" width="400">
   <br />

7. After all this structuring, we still need to perform dependency injection and type the new adapters in the application.
   This "typing" is necessary so that our application has a "definition" of what it expects to receive from primary and secondary adapters in order to function.

   In this way, we avoid removing any adapters required by the application and eventually crashing it during an execution that requires that adapter.
   The idea is to make sure that before it starts, the application has everything it needs in terms of configuration, i.e:

   1. Primary adapters
   2. Secondary adapters
   3. Environment configurations

   <br />

   So, to do this, we just need to change the file [src/core/app/index.ts](src/core/app/index.ts), which joins all the layers of our hexagonal structure:

<br />

8. Changing the application configuration typing [src/core/app/settings.ts](src/core/app/settings.ts):

   <br />
   <img src="assets/readme/application-settings-type.png" width="400">
   <br />

   In this file is where we keep the requirement of what will go into the application. Therefore, as we are creating a new domain, we need to insert it in there.

   Just as if we were going to need a new lib, or a new secondary adapter for example, we would need to indicate it in the application's configuration types because everything is done through dependency injection.

   The main benefit of this is the decoupling of the adapters from the application layer. If one day we need to change a lib, for example, that is being injected into the application, we just need to replace it in its own class. This avoids massive refactoring.
   <br />

9. So now let's actually perform the dependency injection [src/core/app/index.ts](src/core/app/index.ts):

   <br />
   <img src="assets/readme/dependency-injection.png" width="400">
   <br />

This concludes the process of creating a feature.

<br />

[(Back to top)](#topics)
<br />

### How to create a primary adapter in the project using Hexagonal?

To do

<br />

[(Back to top)](#topics)
<br />

### How to create a secondary adapter in the project using Hexagonal?

To do

<br />

[(Back to top)](#topics)
<br />

### Versioning pattern

This repository uses `Trunk Based Development` as the versioning standard in the repository.

<br />

- [What is Trunk Based Development?](https://trunkbaseddevelopment.com/)

<br />
[(Back to top)](#topics)
<br />

### Technical debits

Technical debts are listed in the form of issues on Github itself. Please, to list technical debts, use the issues tab of this repository and the label `Technical Debt`.
<br />

[(Voltar ao topo)](#tópicos)

<br />

### Devops

We currently use Github Actions to deploy the project. Today we have the following environments available: 1. HML 2. PRD
You need to configure the GCP envs to link the actions to the GCP.

<br />

[(Back to top)](#topics)

<br />

### Contributors

<br />

<table>
    <td align="center" valign="top" width="14.28%">
      <a href="https://www.linkedin.com/in/gcmonteiru/"><img src="https://media.licdn.com/dms/image/D4D03AQFRMpoP4Xd66w/profile-displayphoto-shrink_800_800/0/1674127621643?e=1714608000&v=beta&t=ZXunrMcSTEW96zAxPespVBfIpBsUdQYmulfHbY-WTMA" width="120px;" alt="Gabriel Monteiro"/><br /><sub><b>Gabriel Monteiro</b></sub></a><br />
      </td>
</table>

<br />

[(Voltar ao topo)](#tópicos)

<br />
