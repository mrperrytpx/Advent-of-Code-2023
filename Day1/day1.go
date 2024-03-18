package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
	"strings"
	"unicode"
)

func Part1(calibrations []string) int {
	sum := 0

	for _, v := range calibrations {
		var numsInStr []string
		var sb string

		for _, char := range v {
			if unicode.IsDigit(char) {
				numsInStr = append(numsInStr, string(char))
			}
		}

		if len(numsInStr) == 0 {
			sum += 0
			continue
		}

		sb += numsInStr[0] + numsInStr[len(numsInStr)-1]

		val, err := strconv.Atoi(sb)
		if err != nil {
			log.Fatal(err)
		}

		sum += val
	}

	return sum
}

func Part2(calibrations []string) int {
	sum := 0
	numsInLetters := map[string]string{
		"one":   "1",
		"two":   "2",
		"three": "3",
		"four":  "4",
		"five":  "5",
		"six":   "6",
		"seven": "7",
		"eight": "8",
		"nine":  "9",
	}

	var keys []string
	for key := range numsInLetters {
		keys = append(keys, key)
	}
	sort.Strings(keys)

	for _, v := range calibrations {
		newStr := v

		for _, word := range keys {
			number := numsInLetters[word]
			newStr = strings.ReplaceAll(newStr, word[:len(word)-1], number)
		}

		var numsInStr []string
		for _, char := range newStr {
			if unicode.IsDigit(char) {
				numsInStr = append(numsInStr, string(char))
			}
		}

		if len(numsInStr) == 0 {
			sum += 0
			continue
		}

		num := numsInStr[0] + numsInStr[len(numsInStr)-1]
		val, err := strconv.Atoi(num)
		if err != nil {
			log.Fatal(err)
		}

		sum += val
	}
	return sum
}

func main() {
	calibrations := ReadInput("Day1/input.txt")
	fmt.Println(Part1(calibrations))
	fmt.Println(Part2(calibrations))
}

func ReadInput(fname string) []string {
	file, err := os.Open(fname)
	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	var calibrations []string
	scan := bufio.NewScanner(file)

	for scan.Scan() {
		text := scan.Text()
		calibrations = append(calibrations, text)
	}

	return calibrations
}
