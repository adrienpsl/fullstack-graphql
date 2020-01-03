# Fullstack GraphQL
> Learn how to use GraphQL with Node and React

This course comes with some [slides](https://docs.google.com/presentation/d/1IrGA4PtUEZPVDTBg5_WCMmUapElbFBgLwfSBAp8ft1g/edit?usp=sharing)


## What you'll need
* Node version >= 6

## Solutions
The solution branch has the completed course fo reference. There is no one way to finish this course.
`git checkout solution`


# Personal notes:

## What is GraphQl
A spec that describes a declarative query language that your clients can use
to ask an API for the exact data they want. This is achieved by creating a strongly
typed Schema for your API, ultimate flexibility in how your API can resolve data,
and client queries validated against your Schema.
* GraphQl is just a spec, the lib implement their own interpretation

## Operation name
* can be anonymous
```
tata {
    titi
}
```
* like function with name
```
query allCharacters {
    results {
        name
    }
}
``` 
* I can use variable inside my operation
    -   like in js, when a variable is declare in the operation, it's available in all
        the operation
```
query allCharacters ($page: Int, $filter: Filter) {
    characters(page: $page, filter: $filter) {
        name
    }
}
```
* I can use alias to rename stuff, I can rename any fields
```
query allCharacters (...) {
    results :character(...) {
        fullName : name
    }
}
```
* I can run multiple queries in one request
```$xslt
query allCharacters (...) {
    results :character(...) {
        fullName : name
    }
!! important to rename, because graphql check if same name
    somethingElse: allCharacters (...) {
    results :character(...) {
        fullName : name
    }
}
```
* difference between mutation and queries
    - convention: any write operation need to be mutation
    - technical: Query fields can be executed in parallel, while mutation
      Must be execute serially
* Data are send like Post request 

* apollo client :
  - apollo wrap all the queries to replace ajax or similar
  - can be the sources of true, and replace the store, 
  - has good plugging interface
  - no framework related
  - the ultimate usage of apollo is to use it to query all the stuff, 
    event the Dom
    
* apollo storing data Api
  - All node are stored flat by an unique ID
  - All data are flat in purpose of: 
        * if 2 queries fetch very slightly data, and after that, 
          one of the element is update, we need to change the data only at one place
          
  





