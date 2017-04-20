let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection

let init = function(){
	return result = connection.define('result',{
		id: {
			type: sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		marks_scored: {
			type: sequelize.INTEGER,
			allowNull:false
		},
		status:{
				type:sequelize.BOOLEAN,
				allowNull:false,
				defaultValue:true
		}
	},
	{
		classMethods: {	
			associate: function(models){
				let exam = models.exam
				let subject = models.subject
				let student = models.student
				let result = models.result

				exam.hasMany(result, {foreignKey: 'exam_id', unique: 'resultOfAStudent'});
				student.hasMany(result, {foreignKey: 'student_id', unique: 'resultOfAStudent'})
				subject.hasMany(result, {foreignKey: 'subject_id', unique: 'resultOfAStudent'})
			}
		}
	})
}
module.exports = init