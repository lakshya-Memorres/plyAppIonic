#!/usr/bin/env python3
import json
import subprocess
from datetime import datetime

def get_git_branch():
    return subprocess.check_output([
	"git",
	"branch",
	"--show-current"
]).strip().decode()

def get_git_commit_sha():
    return subprocess.check_output([
	"git",
	"rev-parse",
	"HEAD"
]).strip().decode()

# Replace these values with the ones you want to update in build.json
ci_value = False
branch_name = get_git_branch()
build_number = "123"
sha1 = get_git_commit_sha()
timestamp = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")

# Path to your build.json file
build_json_path = "src/environments/build.json"

# Read the existing data
with open(build_json_path,
"r") as file:
    data = json.load(file)

# Update the values
data[
	"CI"
] = ci_value
data[
	"BRANCH"
] = branch_name
data[
	"BUILD_NUMBER"
] = build_number
data[
	"SHA1"
] = sha1
data[
	"TIMESTAMP"
] = timestamp

# Write the updated data back to build.json
with open(build_json_path,
"w") as file:
    json.dump(data, file, indent=4)
