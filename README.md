# **Jobby App**

[https://prakashjobby.ccbp.tech/](https://prakashjobby.ccbp.tech/)


##### Implemented Jobby App where users can log in and can see a list of jobs with search by Job title, filters based on Salary range and Employment type, etc.

##### ● Implemented different pages like Login, Home, Jobs, Job item details using React components, props, state, lists, event handlers, form inputs.


![Home](https://res.cloudinary.com/dp8ggbibl/image/upload/v1678971714/dibuy/Home_awjdxx.png)


##### ● Authenticating by taking username, password and doing login post HTTP API Call.
##### ● Persisted user login state by keeping jwt token in client storage, Sending it in headers of further API calls to authorize the user.


![Login](https://res.cloudinary.com/dp8ggbibl/image/upload/v1678971713/dibuy/Login_sff3g3.png)



● Implemented different routes for Login, Home, Jobs, Job item details pages by using React Router components Route, Switch, Link.

● Implemented filters and search text by sending them as query parameters to jobs API calls.


![Jobs](https://res.cloudinary.com/dp8ggbibl/image/upload/v1678971714/dibuy/Jobs_l3qqcm.png)


![JobDetails](https://res.cloudinary.com/dp8ggbibl/image/upload/v1678971714/dibuy/JobDetails_w76czo.png)


● Redirecting to the login page if the user tries to open Home, Trending, Gaming, Saved videos, Video item details routes which need authentication by implementing protected Route.
