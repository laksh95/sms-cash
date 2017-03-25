let data = require('./../../config/db');
let sequelize = data.sequelize;
let connection = data.connection;

module.exports=function(){
let elective= connection.define('elective',{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    name: {
            type: sequelize.STRING,
            allowNull: false,
            unique: 'uniqueElective'
          },
    credit: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    status:  {
          type: sequelize.BOOLEAN,
           default: true
        }
  },
  {
  classMethods: {
                  associate: function(models){
                    let elective= models.elective;
                    let curriculum= models.curriculum;
                    curriculum.hasMany(elective,{
                      foreignKey : 'curriculum_id',
                      unique: 'uniqueElective'
                     });
                    elective.belongsToMany(subject, {
                       through : "elective_subject"
                      });
                  }
  }
},
{
  instanceMethods:{}
}
);
  return elective;
};
