import requests

def test_flashcard_endpoint():
    # Your backend endpoint that handles PDF + optional text
    url = "http://localhost:4000/api/flashcards/generate"

    # Path to the local PDF file you want to upload
    pdf_path = "/Users/simonpontoppidan/Downloads/31392-PAS-6-Kalman_Filter-seperate.pdf"

    # Extra text or prompt you want to send alongside the file
    text_content = "Please generate flashcards from this PDF. Please cover all subjects"

    # Prepare the multipart/form-data
    # 'pdfFile' must match the field name in your Multer config / controller
    with open(pdf_path, "rb") as f:
        files = {"pdfFile": (pdf_path, f, "application/pdf")}

        # If your endpoint expects 'content' in the body for additional text:
        data = {
            "content": text_content
        }

        # Make the POST request
        response = requests.post(url, files=files, data=data)

    # Print results
    print("Status Code:", response.status_code)
    try:
        json_data = response.json()
        print("JSON Response:\n", json_data)
    except Exception as e:
        print("Failed to parse JSON:", e)
        print("Raw Response:\n", response.text)

if __name__ == "__main__":
    test_flashcard_endpoint()
