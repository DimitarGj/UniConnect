# UniConnect


Project for CS 440 - Software Engineering I

Contributors: Syed Mehdi, Oscar Franco, Syed Shaban, Dimitar Gjorgievski

Social Platform for Students at UIC

# Motivation

UniConnect is meant to be a free service that aims to bridge the gap between the physical and digital realms of university socialization by providing a comprehensive social networking platform tailored specifically for UIC students. The platform facilitates informal connections among students, fostering friendships and professional networks that extend beyond the confines of academia. By leveraging modern web technologies, UniConnect offers students a user-friendly interface where they can interact, share experiences, and engage in both casual and formal discussions. Students can follow each other, building networks of connections based on shared interests, academic pursuits, or personal affiliations.

## Design

The technical aspect of this project has a couple of components that tie it together and allow its functionality. It follows the MVC software design pattern. The front end and UI side of this project is developed with the React.js framework, which among other things it is also responsible for deploying messages to the back end as to what action the user is trying to execute (i.e. creating a profile, log in, follow/unfollow student, create a post, etc.). The back end is implemented with Java and the Spring Boot framework, and it establishes the server that communicates with the user. It allows the user to store their information by also establishing a connection with the database. This database is a schema in MySQL which stores users’ information, such as their account information, their posts, and their established connections with each other. The database is also deployed on the cloud by utilizing Amazon Web Services. This allows all users, across all devices, to be able to have synchronized updates to this database.


