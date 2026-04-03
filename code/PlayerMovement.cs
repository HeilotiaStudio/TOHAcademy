using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    // Movement Settings
    public float walkSpeed = 5f;
    public float sprintSpeed = 8f;
    public float jumpHeight = 2f;
    public float gravity = -9.81f;
    
    // Mouse Look Settings
    public float mouseSensitivity = 100f;
    public Transform playerCamera;
    
    // Private Variables
    private CharacterController controller;
    private Vector3 velocity;
    private float xRotation = 0f;
    private bool isGrounded;
    
    void Start()
    {
        controller = GetComponent<CharacterController>();
        Cursor.lockState = CursorLockMode.Locked;
    }
    
    void Update()
    {
        // Ground Check
        isGrounded = controller.isGrounded;
        
        if (isGrounded && velocity.y < 0)
        {
            velocity.y = -2f;
        }
        
        // Get Input
        float x = Input.GetAxis("Horizontal");
        float z = Input.GetAxis("Vertical");
        
        // Calculate Movement
        Vector3 move = transform.right * x + transform.forward * z;
        
        // Sprint Check
        float speed = Input.GetKey(KeyCode.LeftShift) ? sprintSpeed : walkSpeed;
        
        controller.Move(move * speed * Time.deltaTime);
        
        // Jump
        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            velocity.y = Mathf.Sqrt(jumpHeight * -2f * gravity);
        }
        
        // Apply Gravity
        velocity.y += gravity * Time.deltaTime;
        controller.Move(velocity * Time.deltaTime);
        
        // Mouse Look
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;
        
        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -90f, 90f);
        
        playerCamera.localRotation = Quaternion.Euler(xRotation, 0f, 0f);
        transform.Rotate(Vector3.up * mouseX);
    }
}
