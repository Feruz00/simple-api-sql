'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../../config/db');
const bcrypt = require('bcryptjs');
const AppError = require('../../utils/appError');


module.exports = sequelize.define('users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'dean', 'head'),
    allowNull: false,
    validate:{
      isIn:{
        args:[['admin', 'dean', 'head']],
        msg: 'user type only be: admin, head, dean'
      },
      notNull:{
        msg:'user type cannot be null'
      },
      notEmpty:{
        msg:'user type cannot be empty'
      },
      notIn:{
        msg: 'Only be admin, head and dean'
      }
    }
  },
  email:{
    type: DataTypes.STRING,
    // allowNull: false,
    defaultValue: '',
    unique: {
      msg: 'That email is not available.'
    },
    // validate:{
    //   notNull: {
    //     msg: 'Email required'
    //   },
    //   notEmpty:{
    //     msg:'email cannot be empty'
    //   },
    //   isEmail:{
    //     msg: 'Invalid email'
    //   }
    // }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notNull: {
        msg: 'Password cannot be null'
      },
      notEmpty:{
        msg:'Password cannot be empty'
      }
    }
  },
  confirmPassword:{
    type: DataTypes.VIRTUAL,
    set(value){
      if(value === this.password){
        if(this.password.length < 7) {
          throw new AppError('Password length must be greater than 7')
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(value, salt)
        this.setDataValue('password', hashPassword);// = hashPassword
      }
      else{
        throw new AppError(
          'Password and confirm password must be the same',
          400
        )
      }
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notNull:{
        msg:'firstName cannot be null'
      },
      notEmpty:{
        msg:'firstName type cannot be empty'
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notNull:{
        msg:'lastName type cannot be null'
      },
      notEmpty:{
        msg:'lastName type cannot be empty'
      }
    },
  },
  
},{
  indexes:[
    {
      unique: true,
      fields:['username', 'email'],
    }
  ],
  timestamps: true, 
  paranoid: true,
  freezeTableName: true,
  modelName: 'users'
})