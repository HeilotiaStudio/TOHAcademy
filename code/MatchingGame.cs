using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;

public class MatchingGame : MonoBehaviour
{
    [System.Serializable]
    public class ButtonPair
    {
        public Button[] buttons; // Each pair's buttons (size = 2)
    }

    public List<ButtonPair> pairs = new List<ButtonPair>(); // All pairs
    public GameObject[] feedbackObjects; // Feedback for each pair
    public GameObject winObject; // Object shown when all pairs found

    private Button lastClickedButton = null;
    private int pairsFound = 0;

    void Start()
    {
        foreach (var pair in pairs)
        {
            AttachEventListeners(pair.buttons);
        }
    }

    void AttachEventListeners(Button[] buttons)
    {
        foreach (Button button in buttons)
        {
            button.onClick.AddListener(() => OnButtonClick(button));
        }
    }

    void OnButtonClick(Button clickedButton)
    {
        if (lastClickedButton == clickedButton)
            return;

        if (lastClickedButton == null)
        {
            lastClickedButton = clickedButton;
        }
        else
        {
            if (AreMatchingPair(lastClickedButton, clickedButton))
            {
                pairsFound++;
                DisableButtons(lastClickedButton, clickedButton);

                if (pairsFound == pairs.Count)
                {
                    Debug.Log("All pairs found!");
                    ActivateFeedback(pairsFound - 1);
                    if (winObject != null) winObject.SetActive(true);
                }
                else
                {
                    ActivateFeedback(pairsFound - 1);
                }
            }
            else
            {
                Debug.Log("Not a matching pair!");
            }

            lastClickedButton = null;
        }
    }

    bool AreMatchingPair(Button b1, Button b2)
    {
        foreach (var pair in pairs)
        {
            if (System.Array.Exists(pair.buttons, btn => btn == b1) &&
                System.Array.Exists(pair.buttons, btn => btn == b2))
                return true;
        }
        return false;
    }

    void DisableButtons(Button b1, Button b2)
    {
        b1.interactable = false;
        b2.interactable = false;
    }

    void ActivateFeedback(int index)
    {
        if (index >= 0 && index < feedbackObjects.Length)
        {
            feedbackObjects[index].SetActive(true);
        }
    }
}