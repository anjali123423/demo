
package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final user_repository userRepository;

    public UserController(user_repository userRepository) {
        this.userRepository = userRepository;
    }

    // READ - Get all users
    @GetMapping
    public List<user> getAllUsers() {
        return userRepository.findAll();
    }

    // CREATE - Add new user
    @PostMapping
    public user addUser(@RequestBody user user) {
        return userRepository.save(user);
    }

    // READ - Get user by ID
    @GetMapping("/{id}")
    public Optional<user> getUserById(@PathVariable Long id) {
        return userRepository.findById(id);
    }

    // UPDATE - Update user
    @PutMapping("/{id}")
    public user updateUser(@PathVariable Long id,
                           @RequestBody user newUser) {

        user user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(newUser.getName());
        user.setEmail(newUser.getEmail());
        user.setPhone(newUser.getPhone());

        return userRepository.save(user);
    }

    // DELETE - Delete user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {

        userRepository.deleteById(id);

        return "User deleted successfully!";
    }
}
