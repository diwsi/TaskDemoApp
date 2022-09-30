# TaskDemoApp
A demo application for demonstration purposes. Simple task and comment application. Since I have 3 days of deadline and my very busy job, I missed some features or better practices. I hope it still provides enough hints.

To run app...

<b>Database</b><br>
I used MsSql server and a backup file  and database script located at Assests/SQLBackup. Backup file contains some necessary data for demo. Connected with windows authentication and connection string of application is located at <b>Services\TaskService\TaskAPI\appsettings.json</b>


<b>Services:<b></br>
There are 2 web applications.  Gateway and TaskAPI projects must run and pre configured for following ports:</br>
Gateway:5000</br>
TaskAPI:5001</br>
</br>
Web<br>
AngularClient folder contains angular client application. run  "npm install"  for required packages and "ng serve" to run application.
</br></br>
*No ORM applied as requested</br>
*No authentication applied</br>
*No paginatin applied for API's</br>
</br>
Regars.</br>
Engin
