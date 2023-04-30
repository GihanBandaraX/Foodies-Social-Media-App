package com.project.foodies.PostManagement;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController 
@RequestMapping(path = "/paf") 
public class PostController {
    @Autowired
    private PostRepository postRepository;

    @PostMapping(path = "/addpost")  
    public @ResponseBody String addNewPost(@RequestParam String caption, @RequestParam String expression, @RequestParam("photo") MultipartFile photo) throws IOException {
       
       
       
        Post n = new Post();
        n.setCaption(caption);
        n.setExpression(expression);
        n.setPhoto(photo.getBytes());
        postRepository.save(n);
        return "Post Saved";
    }

    @GetMapping(path = "/allpost")
    public @ResponseBody Iterable<Post> getAllUsers() {
        
        return postRepository.findAll();
    }

    
    @PutMapping(path = "/updatepost/{id}")
    public @ResponseBody String updatePost(@PathVariable Integer id, @RequestParam String caption, @RequestParam String expression, @RequestParam("photo") MultipartFile photo) throws IOException {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setCaption(caption);
            post.setExpression(expression);
            post.setPhoto(photo.getBytes());
            postRepository.save(post);
            return "Updated";
        } else {
            return "not found";
        }
    }


    @DeleteMapping(path = "/deletepost/{id}")
    public @ResponseBody String deletePost(@PathVariable Integer id) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent()) {
            postRepository.deleteById(id);
            return "Deleted";
        } else {
            return "not found";
        }
    }

}