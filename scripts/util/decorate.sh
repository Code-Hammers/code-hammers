# ANSI escape codes for colors
RED="\033[1;31m"
ORANGE="\033[1;38;5;208m"
YELLOW="\033[1;33m"
GREEN="\033[1;32m"
BLUE="\033[1;34m"
INDIGO="\033[1;38;5;75m"
VIOLET="\033[1;38;5;93m"
RESET="\033[0m"

# Define color array
COLORS=($RED $ORANGE $YELLOW $GREEN $BLUE $INDIGO $VIOLET)

# Define the infinity symbol
INFINITY="•"

# Function to print a line of the thing
print_line() {
    local color_index=$1
    local num_symbols=$2
    local color=${COLORS[$color_index]}
    local i
    echo -en "${color}${INFINITY}${RESET}"
    # for ((i = 0; i < num_symbols; i++)); do
        # echo -en "${color}${INFINITY}${RESET}"
    # done
}

# Function to print the thing
print_thing() {
    local num_lines=7
    local total_width=56  # Change this value for longer or shorter symbol
    local color_index
    local line_width
    local i
    local j

    for ((i = 0; i < num_lines; i++)); do
        color_index=$(( i % ${#COLORS[@]} ))
        line_width=$(( total_width - (i * 8) ))
        # line_width=$(( total_width ))
        for ((j = 0; j < line_width; j++)); do
            print_line $color_index $line_width
        done
        echo  # Move to the next line
    done
}

# Print the thing with changing colors
print_thing
