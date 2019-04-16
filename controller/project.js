'use strict'

//import Project from '../models/project';

const Project = require('../models/project');//Importar Modelo
const fs= require('fs');
const path = require('path');


var controller = {
    home: function(req, res){
        return res.status(200).send({
            message : 'Hola soy el archivo Home'
        })
    },
    test: function(req, res){
         return res.status(200).send({
            message : 'Hola soy el archivo Test'
        })
    },
    saveProject: function(req, res){
        var project = new Project();
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category= params.category;
        project.langs= params.langs;
        project.year= params.year;
        project.image= params.image;

        project.save((err, projectStored)=>{
            if(err) return res.status(500).send({
                massege: 'Error al guardar el DOcumento'
            })
            if(!projectStored) return res.status(402).send({
                massege: 'No se ha podido guardar el DOcumento'
            })
            return res.status(200).send({
                //massege: 'Metodo Save-Project',
                //params: params,
                project: projectStored
            })

        })
    },
    getProject: function(req, res){
        var projectId = req.params.id;
        if(projectId == null) return res.status(500).send({message: 'El proyecto no existe'});
        Project.findById(projectId, (err, project)=>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'})
            if(!project) return res.status(404).send({message: 'El proyecto no existe'})
            return res.status(200).send({
                project
            })


        })
    },
    getProjects:function(req,res){
        Project.find({}).exec((err,projects)=>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'})
            if(!projects) return res.status(404).send({message: 'El proyecto no existe'})
            return res.status(200).send({projects})
        })
    },
    UpdateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;
        if(projectId == null) return res.status(500).send({message: 'El proyecto no existe'});
       /* findOneAndUpdate findByIdAndUpdate*/
       // Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdate)=>{
        Project.findOneAndUpdate({ _id: projectId  }, update, {new:true}, (err, projectUpdate)=>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'})
            if(!projectUpdate) return res.status(404).send({message: 'El proyecto no existe'})
            return res.status(200).send({
                                project: projectUpdate
                            })
        })
    },
    deleteProject: function(req, res){
        var projectId = req.params.id;
       
        if(projectId == null) return res.status(500).send({message: 'El proyecto no existe'});
        //findOneAndDelete  findByIdAndRemove
        Project.findOneAndDelete({ _id: projectId  }, (err, projectRemove)=>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'})
            if(!projectRemove) return res.status(404).send({message: 'El proyecto no existe'})
            return res.status(200).send({projectRemove})
        })

    },
    uploadImage: function(req, res){
        var projectId = req.params.id;
        var fileName = 'Imagen no subida';
       
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('.')[1];
          
            /*findOneAndUpdate findIdAndUpdate*/
            if(extSplit == 'png' || extSplit == 'jpg' || extSplit == 'jpeg'|| extSplit == 'gif' || extSplit == 'PNG'){

                Project.findOneAndUpdate({ _id: projectId  }, {image: fileName}, {new:true}, (err, projectUpdate)=>{
                    if(err) return res.status(500).send({message: 'Error al devolver los datos'})
                    if(!projectUpdate) return res.status(404).send({
                        message: 'El proyecto no existe', 
                    })
                    return res.status(200).send({
                        project: projectUpdate,
                        name: projectId
                        // contenido: extSplit
                    })
                })
            
            
            
             
            
            }else{
                fs.unlink(filePath, (err)=>{
                    return res.status(200).send({
                        message: "La extension no es valida"
                    })
                })
            }/*
            return res.status(200).send({
                files: req.files
            });*/
        }else{
            return res.status(400).send({
                message: fileName,
                
            })
        }

    },
    getImageFile: function(req, res){
        var file = req.params.image;
        //req.params.file;
        //console.log("Este es el archivo: "+file)
        var path_file = './uploads/'+file;
            
        fs.exists(path_file, (exists) => {
            //console.log(exists)
            if(exists){
                return res.sendFile(path.resolve(path_file))
            }else{
                return res.status(200).send({
                    message: "La imagen no existe"
                })
            }
        })
    }
}

module.exports = controller;