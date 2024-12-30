# #works properly, opens camera window, caaptures image and closes automatically

import cv2
import eel
import numpy as np
from tensorflow.keras.models import load_model

# Initialize Eel
eel.init('WD')



# Define emotions
emotions = ["angry", "happy", "sad", "neutral"]

# Video capture and face cascade
video_capture = cv2.VideoCapture(0)
face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")

# Load the trained TensorFlow model
model = load_model('my_model.keras')

# Function to draw green rectangle around face
def draw_rectangle(image, face):
    for (x, y, w, h) in face:
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

# Function to identify emotions
def identify_emotions():
    prediction = []
    for img in facedict.values():
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert to RGB format
        img = cv2.resize(img, (48, 48))  # Resize the image to match the model's input shape
        img = img / 255.0  # Normalize pixel values to the range [0, 1]
        img = img.reshape((1, 48, 48, 3))  # Reshape to match the model's input shape
        pred = model.predict(img)
        emotion = emotions[np.argmax(pred)]
        prediction.append(emotion)
    output = max(set(prediction), key=prediction.count)
    print("You seem to be %s" % output)
    facedict.clear()
    return output

# Define a mapping of emotions to song index ranges
emotion_index_ranges = {
    "angry": (0, 29),
    "happy": (30, 59),
    "sad": (60, 89),
    "neutral": (90, 119)
}

# Function to get the song index range based on the detected emotion
def getSongIndexRange(emotion):
    return emotion_index_ranges.get(emotion, (0, 0))  # Default to (0, 0) if emotion not found


# Exposed function to start emotion detection
@eel.expose
def startEmotionDetection():
    global video_capture
    if video_capture is not None and video_capture.isOpened():  # Check if video capture is open
        video_capture.release()  # Release video capture before starting emotion detection
    video_capture = cv2.VideoCapture(0)  # Reinitialize video capture

# Exposed function to stop emotion detection
@eel.expose
def stopEmotionDetection():
    global video_capture
    if video_capture is not None and video_capture.isOpened():  # Check if video capture is open
        video_capture.release()  # Release video capture when stopping emotion detection

# Exposed function to get emotion
@eel.expose
def getEmotion():
    global facedict
    facedict = {}
    count = 0
    capturing = True
    cv2.namedWindow("Emotion Detection", cv2.WINDOW_NORMAL)
    cv2.resizeWindow("Emotion Detection", 600, 400)
    
    while capturing:
        count += 1
        ret, frame = video_capture.read()
        if ret:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # Convert frame to grayscale
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
            clahe_image = clahe.apply(gray)
            faces = face_cascade.detectMultiScale(clahe_image, scaleFactor=1.1, minNeighbors=15, minSize=(10, 10), flags=cv2.CASCADE_SCALE_IMAGE)
            
            if len(faces) >= 1:
                draw_rectangle(frame, faces)  # Draw green rectangle around face
                cv2.imshow("Emotion Detection", frame)
                cv2.waitKey(1)
                
                for (x, y, w, h) in faces:
                    faceslice = clahe_image[y:y+h, x:x+w]
                    faceslice = cv2.resize(faceslice, (48, 48))
                    facedict["face%s" % (len(facedict) + 1)] = faceslice

            if count == 100:
                capturing = False

    cv2.destroyWindow("Emotion Detection")  # Close the window
    emotion = identify_emotions()
    index_range = getSongIndexRange(emotion)
    eel.displaySongsBasedOnEmotion(emotion)
    # eel.playSongsBasedOnEmotion(emotion)
    eel.playSongsSequentially(emotion,index_range)
    return emotion, index_range

# Expose the local function to Eel
eel.expose(identify_emotions)

# Start the Eel application
eel.start('main.html')

















 










