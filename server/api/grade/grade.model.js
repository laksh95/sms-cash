let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection

let init = function(){
	return grade = connection.define('grade',{
		id: {
			type: sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		grade: {
			type: sequelize.STRING,
			allowNull:false
		},
		start_marks: {
			type: sequelize.INTEGER,
		},
		end_marks:{
			type: sequelize.INTEGER,
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
				let grade = models.grade
				exam.hasMany(grade, {foreignKey: 'exam_id'});
			}
		}
	})
}
module.exports = init

