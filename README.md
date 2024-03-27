# Decentralized Pet Adoption Platform

This project is created to facilitate pet adoption processes on a decentralized platform. It aims to help animal lovers come together and adopt pets, homeless animals, finding them new homes.

## Technologies

- Frontend: React, JavaScript
- Backend: Motoko

## How it works
The platform allows users to create, read, update, and delete pet posts, which include information about pets available for adoption. Each pet post contains comprehensive information about the pet, including:
- `Title`: A descriptive title for the pet post.
- `Message`: Additional details about the pet, such as its breed, age, temperament, and any special needs.
- `Selected Image File`: An image representing the pet, aiding in visual identification and appeal.
- `Creation Date`: The date when the pet post was created, providing a timeline of pet availability.
- `Description`: Further information about the pet's personality, habits, and compatibility with potential adopters.
- `Location`: The geographical location of the pet, facilitating local adoptions and community engagement.
- `Comments`: Feedback and inquiries from other users interested in adopting the pet, fostering community interaction and support.

## Data Structures
- `PetPostId`: Represents the unique identifier for each pet post.
- `Comments`: Represents a list of comments associated with a pet post.
- `PetPostType`: Represents the structure of a pet post, including its ID, title, message, image, creation date, description, location, and comments.

## Functions
- `getPetPosts`: Retrieves all pet posts available on the platform.
- `create`: Creates a new pet post with the provided information.
- `read`: Retrieves the details of a specific pet post based on its ID.
- `update`: Updates the information of an existing pet post. This function can also be utilized to add comments to a pet post. After retrieving the existing pet post using its ID, you can update its information, including adding new comments. If you want to add a comment, you can pass the updated pet post with the new comment added to the update function. The platform will then replace the existing pet post with the updated one, effectively adding the new comment to the post.
- `delete`: Deletes a pet post from the platform.

## Contribution
This project expects contributions from developers familiar with technologies like React, Motoko and Rust. Those who wish to contribute can clone the project, make enhancements, and submit pull requests.

## Installation

1. Clone the project:
   ```sh
   git clone https://github.com/efecaglarr/ICP_Final_Project.git
2. Navigate to the frontend and backend folders and install necessary dependencies:
   ```sh
   cd ./src/finalproject_frontend
   npm install
   npm start # If you wish to make changes or just to see.
3. Dfx is required to run this project. After downloading the requirements, to start your backend run the `dfx start` command in an empty terminal. Then in another terminal run these commands:
   ```sh
   cd ./src/finalproject_backend
   dfx deploy

## UI

<img width="1112" alt="image" src="https://github.com/efecaglarr/ICP_Final_Project/assets/128126851/52ac2c0a-3c39-4fbd-8dc2-898ba8349792">
<hr />
<img width="1138" alt="image" src="https://github.com/efecaglarr/ICP_Final_Project/assets/128126851/ad97dde2-73b4-4ffc-8d73-ec1c7ae26c65">
