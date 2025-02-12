import os

def rename_images_in_directory(directory_path):
    # Get the list of all files in the directory
    files = os.listdir(directory_path)
    
    # Filter the list to only include image files (e.g., .jpg, .png, etc.)
    image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
    image_files = [f for f in files if any(f.lower().endswith(ext) for ext in image_extensions)]

    # Sort the image files by their name to ensure consistent renaming order
    image_files.sort()

    # Rename each image file
    for i, file_name in enumerate(image_files, start=1):
        # Get the file extension
        file_extension = os.path.splitext(file_name)[1]
        
        # Create new filename (1.jpg, 2.jpg, 3.jpg, ...)
        new_name = f"{i}{file_extension}"
        
        # Get the full paths
        old_path = os.path.join(directory_path, file_name)
        new_path = os.path.join(directory_path, new_name)
        
        # Rename the file
        os.rename(old_path, new_path)
        print(f"Renamed: {file_name} -> {new_name}")

# Example usage:
directory_path = r"D:\Tanish IT\1000images"  # Change to your image directory path
rename_images_in_directory(directory_path)
