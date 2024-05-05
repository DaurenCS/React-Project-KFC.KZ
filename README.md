---

# Business Documentation for [KFC.KZ]

## 1. Introduction

### 1.1 Purpose of Documentation

This document serves as a comprehensive guide to understanding the various aspects of KFC.KZ. It outlines the mission, functionality, technical details, and guidelines for maintaining and updating the website.

### 1.2 Target Audience

- Development Team
- Content Creators
- Marketing Team
- Customer Support
- Management

### 1.3 Document Revisions

| Version | Date       | Author         | Changes Made                |
|---------|------------|----------------|-----------------------------|
| 1.0     | 2023-12-17 | Dauren, Danila | Initial Draft               |


## 2. Overview of the Website

### 2.1 Mission Statement

KFC.KZ aims to Providing complete and accurate information about menus, prices and promotions at KFC restaurants.Providing the possibility of online orders of dishes with delivery or for pickup.Creating a user-friendly interface for selecting dishes, adding them to the cart and placing an order.



### 2.3 Objectives

- Online orders, Delivery
- user-friendly interface
- Information about KFC.KZ

### 2.4 Target Audience

Our primary audience includes Individuals who are interested in exploring KFC's menu, promotions, and finding information about the nearest KFC locations.
Customers looking to place online orders for delivery or pick-up. Secondary audiences may include Individuals who may be considering trying KFC for the first time and are seeking information about the restaurant, menu options, and reviews.

## 3. Functional Overview

### 3.1 Core Features

- Choose product by category
- Add to Cart with optional product
- See history of purchase

### 3.2 User Roles and Permissions

- Administrator(by Backend)
- Registered Customer
- Guest Customer

### 3.3 Key Processes

- Adding to Cart
- Login/Registreation
- Confirm order

## 4. Technical Infrastructure

### 4.1 Hosting Details

# YOU CAN CHECK OUR PROJECT ON HOST 

[app link on firebase host](https://react-project-pwa-3b0a1.web.app).


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### 4.2 Technology Stack

- Frontend: [React]
- Backend: [Django]
- Database: [SQLite]



## 5. Website Architecture

### 5.1 Information Architecture
Homepage:
    Welcome message, KFC logo, and high-quality images of popular menu items.
    Quick links or buttons for Menu, Promotions,  and Online Ordering.
    Advertising

Navigation Bar:
    Home | Login | Logout | Cart | 

Menu Section:
    Categories: 
    Burgers, Drinks, Bosquets, Juicy Chicken, Boxes, Combo Burgers, Bosket Combos, Twisters, Sauces and extras
    Each category has a own products

Productpage:
    big image of product
    optional items like drinks,sauces
    description of product
    Price and button "add to Cart" 

Loginpage:
    input for login and password
    button "login" and "register"
Registerpage:
    input for additional information about user
    button "register"

Cartpage:
    products which user added
    total price
    history of all purchase of user



### 5.2 Navigation Structure

http://localhost:3000/ - Main page

http://localhost:3000/foodlist/:int - Product page

http://localhost:3000/login - Login page

http://localhost:3000/register - Registration page

http://localhost:3000/cart - Cart page 
