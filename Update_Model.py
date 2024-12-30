# -*- coding: utf-8 -*-

import numpy as np
import os
import cv2
import tensorflow as tf
from tensorflow.keras import layers, models, optimizers
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.utils.class_weight import compute_class_weight
import matplotlib.pyplot as plt
import glob
import warnings

# Ignore the UserWarning from PyDataset
warnings.filterwarnings("ignore", message=r"Your `PyDataset` class should call `super\(\).__init__\(\*\*kwargs\)`")

def preprocess_data(emotions, target_size=(48,48)):
    training_data = []
    training_labels = []

    for emotion in emotions:
        emotion_dir = os.path.join("dataset", emotion)
        files = sorted(glob.glob(os.path.join(emotion_dir, "*")))
        for file in files:
            image = cv2.imread(file, cv2.IMREAD_COLOR)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            
            # Apply histogram equalization for contrast enhancement
            image = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
            image = cv2.equalizeHist(image)
            image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
            
            image = cv2.resize(image, target_size)
            training_data.append(image)
            training_labels.append(emotions.index(emotion))

    X = np.array(training_data) / 255.0
    y = np.array(training_labels)

    return X, y

def create_neural_network(input_shape, num_classes):
    model = models.Sequential([
        layers.Input(shape=input_shape),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(256, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(512, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    return model

def update(emotions):
    X, y = preprocess_data(emotions)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    class_weights = compute_class_weight(class_weight='balanced', classes=np.unique(y_train), y=y_train)
    class_weights_dict = dict(enumerate(class_weights))

    datagen = ImageDataGenerator(
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest')

    model = create_neural_network(input_shape=X_train[0].shape, num_classes=len(emotions))
    model.compile(optimizer=optimizers.Adam(learning_rate=0.0001),
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    try:
        history = model.fit(datagen.flow(X_train, y_train, batch_size=32),
                            validation_data=(X_test, y_test),
                            epochs=50,
                            verbose=1,
                            class_weight=class_weights_dict)
    except Exception as e:
        print("Error during model training:", e)
        return

    predictions = model.predict(X_test)
    y_pred = np.argmax(predictions, axis=1)
    acc_score = accuracy_score(y_test, y_pred)
    conf_matrix = confusion_matrix(y_test, y_pred)
    class_report = classification_report(y_test, y_pred, target_names=emotions, output_dict=True)

    print(f"Accuracy: {acc_score * 100:.2f}%")
    print("Confusion Matrix:")
    print(conf_matrix)
    print("Classification Report:")
    for emotion in emotions:
        print(f"Emotion: {emotion}")
        print(f"  Precision: {class_report[emotion]['precision']:.2f}")
        print(f"  Recall: {class_report[emotion]['recall']:.2f}")
        print(f"  F1-score: {class_report[emotion]['f1-score']:.2f}")
        print(f"  Support: {class_report[emotion]['support']}")
        print()

    model.save("my_model.keras")

    plt.figure(figsize=(12, 5))
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'], label='Training Accuracy')
    plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.title('Training and Validation Accuracy')
    plt.legend()

    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'], label='Training Loss')
    plt.plot(history.history['val_loss'], label='Validation Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.title('Training and Validation Loss')
    plt.legend()

    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    emotions = ["angry", "happy", "sad", "neutral"]
    update(emotions)
