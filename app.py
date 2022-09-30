from flask import Flask, redirect, render_template, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///todo.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


class Todo(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    desc = db.Column(db.String(500), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self) -> str:
        return f"{self.sno} - {self.title}"


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # print(request.form['title'])
        title = request.form['title']
        desc = request.form['desc']
        todo = Todo(title=title, desc=desc)
        db.session.add(todo)
        db.session.commit()
    todo = Todo.query.all()
    return render_template('index.html', todo=todo)


# @app.route('/showall')
# def showAll():
#     allTodo = Todo.query.all()
#     print(allTodo)
#     return "This is product page"


@app.route('/update/<int:sno>', methods=['GET', 'POST'])
def update(sno):
    if(request.method == 'POST'):
        title = request.form['title']
        desc = request.form['desc']
        todo = Todo.query.filter_by(sno=sno).first()
        todo.title = title
        todo.desc = desc
        db.session.add(todo)
        db.session.commit()
        return redirect('/')

    todo = Todo.query.filter_by(sno=sno).first()
    return render_template('update.html', todo=todo)


@app.route('/delete/<int:sno>')
def delete_data(sno):
    delTodo = Todo.query.filter_by(sno=sno).first()
    db.session.delete(delTodo)
    db.session.commit()
    return redirect('/')


if __name__ == "__main__":
    app.run(debug=False)


'''intallation:
1. pip install virtualenv
2. virualenv env # to create virtual environment
3. .\env\Scripts\activate.ps1
4. pip install flask
5. pip install flask-sqlalchemy
6. 

'''


'''To create db in this env we need to run two commands in python interpreter
1. >>>from app import db
2. >>>db.create_all()'''







# requirement = develop_flask_code
# while(desire==satisfied AND proper==satisfied):
#     develop_flask_code++

# requirement_completed = develop_flask_code

# print(develop_flask_code)



# ! ego is the enemy 
# ! how to win friends & influence people
# ! startup myth and models 
# power of ignored skills 
# ! the almanack of naval ravikant 

# ! deep work 
# ! make time 
# ! indistractable
# hyper focus 
# ! do it today 
# ! getting things done 
# the one thing 