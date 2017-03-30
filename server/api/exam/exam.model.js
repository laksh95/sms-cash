let database=require('../../config/db')
let sequelize=database.sequelize
let connection=database.connection

let init = function(){
	return exam = connection.define('exam',{
		id: {
			type: sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		date: {
			type: sequelize.DATE,
			allowNull:false
		},
		total_marks: {
			type: sequelize.INTEGER,
		},
		passing_marks:{
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
				let exam_type = models.exam_type
				exam_type.hasMany(exam, {foreignKey: 'type_id'});
				var curriculum = models.curriculum
				curriculum.hasMany(exam, {foreignKey: 'curriculum_id'});
			}
		}
	})
}
module.exports = init

