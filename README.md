# PickMyClasses Website Frontend

This is the official repository for the frontend component of PickMyClasses. The code in this repository is responsible for displaying and handling all user interfaces and interactions.

Follow this document for

- [A tutorial](#prerequisites) of how to setup and launch the website frontend, and
- [A breakdown](#source-code) of the code structure in this repository.

See the documentation for other repositories here:

- [Website Backend](https://capstone-cs.eng.utah.edu/EmptyTome/pmc-server): The main controller of PickMyClasses that receives and processes frontend requests as well as communicates with our database
- [Data Table and File Upload Backend](https://capstone-cs.eng.utah.edu/EmptyTome/pmc-admin-data-table-api): The backend of the data table and file upload functions.
- [Direct Message System Backend](https://capstone-cs.eng.utah.edu/EmptyTome/pmc-admin-dm-server): The backend of the direct message sytem.
- [Data Scraper](https://capstone-cs.eng.utah.edu/EmptyTome/pmc-server): The tool to extract, format, and store data for courses and majors from the University of Utah public course [catalog](https://registrar.utah.edu/Catalog-schedules.php)

---

## Prerequisites

Before running the code in this repository, make sure you have done the following:

1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

2. Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

3. Install the required Node.js libraries by executing the following shell command in this directory:

   ```sh
   npm install
   ```

---

## Launching

To launch the website frontend, do these:

1. Follow [this tutorial](https://capstone-cs.eng.utah.edu/EmptyTome/pmc-server) and have the website backend (pmc-web) launched on the same machine or on some accessible Internet address.

2. Launch the back-end of the data table and file-upload like the README [here](https://capstone-cs.eng.utah.edu/EmptyTome/pmc-admin-data-table-api)

3. Launch the back-end of the direct message system like the README [here](https://capstone-cs.eng.utah.edu/EmptyTome/pmc-admin-dm-server)

4. Edit the file `.env.dev` in this directory. Assign the backend's Internet address to the `REACT_APP_SERVER_URL` variable.

5. Execute the following shell command in this directory:

   ```sh
   npm start
   ```

---

## Source Code

### Structure

Our source code for the website frontend is in the `src/` directory. Here is a quick summary of its structure:

- `App.jsx` is the entry point of our application that defines the routes of the website.

- `api/` contains function that directly communicates with the website backend.

- `components/` contains all the small react components that lives inside a page or shared between pages. It is also where the majority of our code logic is located.

  - The components in this directory are divided into finer groups for better separation of functionalities. Further division may also be used to hide and isolate details for a complex component, where one component's complex logic is enclosed into a directory with the same name.

- `pages/` contains all the page-level components, which are the pages directly instantiated and rendered by the application's routing.

- `utils/` contains some general utility functions intended to be an extension of the JS or JSX language features rather than logic of rendering specific components.

### Code Style

Some notable characteristics of our code that we hope to maintain:

- For developing React code, functional components are preferred (in place of class components).

- [Prettier](https://prettier.io/) is used to automatically format all of our `.js`, `.jsx`, `.css`, and `.json` files.
