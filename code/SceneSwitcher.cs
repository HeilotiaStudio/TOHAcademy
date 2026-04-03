using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneSwitcher : MonoBehaviour
{
    public string targetSceneName; // Specify the name of the scene to switch to

    public void SwitchToTargetScene()
    {
        SceneManager.LoadScene(targetSceneName);
    }
}