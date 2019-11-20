# CityPulse

If you add dependencies to the backend, please generate a reqirements.txt and push it.

While in pipenv shell (backend).

Type:

~~~
pip freeze > requirements.tx
~~~


If you are missing dependencies in the backend, type the following command in (while in pipenv shell).
~~~
pip install -r requirements.txt
~~~


**BACKEND**

For Backend, go to Vitality folder, CD into backend.

Install the virtual environment if you have't done so.

```
pip install pipenv
```

Run your virtual env

```
pipenv shell
```

Download the dependencies (Django and DjangoRestFramework) if you haven't done so.

```
pipenv install
```

To run the server, CD into lbvitality and run:

```
python manage.py runserver
```

Server at http://localhost:8000/

**FRONTEND**

For Frontend, go to Pulse folder, CD into frontend and install dependencies:

```
npm install
```

then to start:

```
npm start
```






