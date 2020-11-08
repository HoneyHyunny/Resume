// for use of Router in express module, import express 
const express = require("express");

const Board = require("../models/board");

const router = express.Router();

const checkAuth = require("../middleware/check-auth");


// getting all boards document from db
router.get("", (req, res, next)=>{
 

    Board.find()
    .then(result=>{
        console.log(result);

        res.status(200).json({
            message: 'Post fetched successfully!',
            body : result
        });
    //db에서 파일을 찾지 못했을때     
    }).catch(error =>{
        res.status(500).json({
            message : "Failed to loading boards from the database."

        });
    });

 
});

// board Creatation 
router.post("", checkAuth, (req, res, next)=>{
    const board = new Board({
        mainTitle : req.body.mainTitle,
        extraTitle : req.body.extraTitle,
        date : req.body.date,
        contents : req.body.contents,
        createdBy : req.userData.userId
    });
    //디비에 성공적으로 저장했다면 그후 id값만 보냄.
    board.save()
    .then(createdBoard =>{
        console.log(createdBoard);
        res.status(201).json({
            message : 'post attached successfully!',
            boardId : createdBoard._id
        });
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message : "Failed to save new board"
        });
    });
   

}); 


//For deletion
//:id -- req.params.id
router.delete("/:id", checkAuth, (req, res, next)=>{
    Board.deleteOne({_id : req.params.id, createdBy: req.userData.userId}).
    then(result =>{
        console.log(result)

        if(result.n > 0){
            res.status(200).json({message : "board deleted successfully!"});
        } else { 
            res.status(401).json({ message : "Not authorized"})
        }
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message : "Failed to delete this board."
        });
    });
});

// For edit
//유저가 현제 페이지에서 새로고침과 같은 경우, 아무런 정보도 없기에 에러가 발생합니다. 
//이때에 이 라우터가 작동하여 id값을 물고 가기때문에 에러를 방지합니다. 
router.get("/:id", (req, res, next)=>{
    //findById method from mongoose 
    console.log("edit get mode entered");
    Board.findById(req.params.id)
    .then(board =>{
        
        if(board) {
            console.log(board);
            res.status(200).json(board);

        } else { 
            res.status(404).json({message : "board not found!"})
        }
        
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message : "Failed to load this board!"
        });
    });
});

//for edit 이 경우에는 이미 db에 _id정보가 있기때문에 , 이 id를 이용하여 정보를 수정한뛰 
//수정에 성공했다면 결과값을 전달합니다. 
router.put("/:id", checkAuth, (req, res, next)=>{
    console.log("edit모드에 진입했습니다.");
    const board = new Board({
        _id : req.body.id,
        mainTitle : req.body.mainTitle,
        extraTitle : req.body.extraTitle,
        date : req.body.date,
        contents : req.body.contents,
        createdBy : req.userData.userId
    });
    Board.updateOne( {_id : req.params.id, createdBy: req.userData.userId}, board)
    .then(result =>{
        if(result.nModified > 0){
            res.status(200).json({message : "Updated Successfully!"});
        } else { 
            res.status(401).json({ message : "Not authorized"})
        }
        
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message : "Failed to edit this board."
        });
    });
})

module.exports = router;