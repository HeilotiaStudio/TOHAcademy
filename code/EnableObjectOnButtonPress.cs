using UnityEngine;
using UnityEngine.UI;

public class EnableObjectOnButtonPress : MonoBehaviour
{
    public Button targetButton; // The button to press
    public GameObject targetObject; // The GameObject to enable

    void Start()
    {
        // Ensure the target object is initially disabled
        targetObject.SetActive(false);

        // Add a listener to the button
        targetButton.onClick.AddListener(OnButtonPress);
    }

    void OnButtonPress()
    {
        // Enable the target object true = enable - false = disable
        targetObject.SetActive(true);
    }
}
