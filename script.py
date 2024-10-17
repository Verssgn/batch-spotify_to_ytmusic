import subprocess

def run_commands_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            links = file.readlines()
        
        links = [link.strip() for link in links if link.strip()]

        for link in links:
            print(f"Running command for link: {link}")
            command = ['spotify_to_ytmusic', 'create', link]
            
            subprocess.run(command, check=True)

            print(f"Finished processing {link}")

    except FileNotFoundError:
        print(f"Error: The file {file_path} does not exist.")
    except subprocess.CalledProcessError as e:
        print(f"Error: Command '{e.cmd}' failed with exit code {e.returncode}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    links_file = 'links.txt'
    
    run_commands_from_file(links_file)
