import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Hashtable;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


// Scrapes https://www.acs.ncsu.edu/php/coursecat/degree_requirements.php
// for information about NC State majors
public class Scrape {
	public static void main(String[] args) throws Exception {
		
		// Set up Web Driver
//	    ChromeOptions chromeOptions = new ChromeOptions();
//	    chromeOptions.addArguments("--headless");
//		System.setProperty("webdriver.chrome.driver", "./lib/chromedriver.exe");
//		ChromeDriver driver = new ChromeDriver(chromeOptions);
		System.setProperty("webdriver.gecko.driver", "./lib/geckodriver.exe");
		FirefoxDriver driver = new FirefoxDriver();
		WebDriverWait wait = new WebDriverWait(driver, 20);
		
		ArrayList<Plan> objects = new ArrayList<Plan>();
//		Hashtable<String, MultiReq> MultiReqTable = new Hashtable<String, MultiReq>();
	    
		// Get panels for each college
	    driver.get("https://www.acs.ncsu.edu/php/coursecat/degree_requirements.php");
	    wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".panel")));
	    List<WebElement> panels = driver.findElementsByCssSelector(".panel");
	    for (WebElement panel : panels) {

	    	// click on panel to reveal majors in college
	    	WebElement drop = panel.findElement(By.cssSelector("[data-parent='#degrees']"));
	    	drop.click();
		    Thread.sleep(500);
	    	List<WebElement> plans = panel.findElements(By.cssSelector(".requirement-link"));
	    	for (WebElement plan : plans) {
	    		if(!plan.getText().equals("Engineering")) {
	    			continue;
	    		}
	    		
	    		// initialize variables for plan object
	    		Plan obj;
	    		String shortName;
	    		String longName;
	    		ArrayList<Course> courseList = new ArrayList<Course>();
	    		Course c;
	    		String name;
	    		String requirement;
//				short unit;
//				String description;
	    		
	    		// click on plan to reveal course requirements
	    		plan.click();
	    		Thread.sleep(5000);
	    	    wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("#plan-name-heading>p")));
	    	    
	    	    // get information about plan
	    		String planName = driver.findElementByCssSelector("#plan-name-heading>p").getText();
	    		shortName = planName.substring(planName.indexOf("(") + 1, planName.indexOf(")"));
	    		longName = planName.substring(0, planName.indexOf("("));
	    		System.out.println(planName);
	    		
	    		// get required courses
	    		List<WebElement> courses = driver.findElementsByCssSelector(".course-link");
	    		for (WebElement course : courses) {
	    			String longCourse = course.getText();
	    			name = longCourse.substring(0, longCourse.indexOf("-")).replaceAll("\\s","");
	    			requirement = "Required Course";
//					course.click();
//					Thread.sleep(3000);
//					unit = Short.valueOf(driver.findElementByCssSelector("#course-units").getText());
//					System.out.println(unit);
//					description = driver.findElementByCssSelector("#course-descr").getText();
//					System.out.println(description);
//					driver.findElementByCssSelector(".close").click();
//					Thread.sleep(2000);
	    			c = new Course(name, requirement); // c = new Course(name, requirement, unit, description);
	    			courseList.add(c);
	    		}
	    		
	    		// get multi-course-links (links that contain optional courses)
	    		List<WebElement> multiReqLinks = driver.findElementsByCssSelector(".multi-req-link");
	    		for (WebElement reqLink : multiReqLinks) {
	    			requirement = reqLink.getText();
	    			
	    			// if the multi-req-link has not already been processed
//	    			if (!MultiReqTable.containsKey(requirement)) {
						reqLink.click();
						Thread.sleep(500);
					    WebElement divParent = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".selected-multi-req + div")));
					    // surround with try-catch in case the multi-req-link contains no courses
					    try {
					    	wait.until(ExpectedConditions.presenceOfNestedElementLocatedBy(divParent, By.cssSelector(".req-course-link")));
					    
					    // get optional courses
						List<WebElement> reqCourses = driver.findElementByCssSelector(".selected-multi-req + div").findElements(By.cssSelector(".req-course-link"));
						for (WebElement course : reqCourses) {
							String longCourse = course.getText();
							name = longCourse.substring(0, longCourse.indexOf("-")).replaceAll("\\s","");
//								course.click();
//								Thread.sleep(3000);
//								unit = Short.valueOf(driver.findElementByCssSelector("#course-units").getText());
//								System.out.println(unit);
//								description = driver.findElementByCssSelector("#course-descr").getText();
//								System.out.println(description);
//								driver.findElementByCssSelector(".close").click(); 
//								Thread.sleep(2000);
							c = new Course(name, requirement); // c = new Course(name, requirement, unit, description);
							courseList.add(c);
						}
						
						// add the multi-req-link to the table in case it is encountered again
//						MultiReqTable.put(requirement, new MultiReq(requirement, courseList));
					    } catch(TimeoutException e) {
					    	System.out.println(requirement);
					    }
//	    			} else {
//						courseList.addAll(MultiReqTable.get(requirement).list);
//					}
	    		}
	    		
	    		// add the plan
	    		courseList = removeDuplicateCourses(courseList);
	    		obj = new Plan(shortName, longName, courseList);
	    		System.out.println(obj.longName);
	    		objects.add(obj);
	    	}
	    }
	    
	    // remove duplicates and sort the plans
	    removeDuplicatePlans(objects);
	    Collections.sort(objects, new Comparator<Plan>() {
	    	public int compare(Plan a, Plan b) {
	    		return a.longName.compareTo(b.longName);
	    	}
	    });
	    
	    // finalize
	    convertToJSON(objects);
	    driver.close();
	}
	
	private static ArrayList<Course> removeDuplicateCourses(ArrayList<Course> courseList) {
		ArrayList<Course> noDuplicates = new ArrayList<Course>();
		for (Course c : courseList) {
			if (!noDuplicates.contains(c)) {
				noDuplicates.add(c);
			}
		}
		return noDuplicates;
	}
	
	private static ArrayList<Plan> removeDuplicatePlans(ArrayList<Plan> plans) {
		ArrayList<Plan> noDuplicates = new ArrayList<Plan>();
		for (Plan p : plans) {
			if (!noDuplicates.contains(p)) {
				noDuplicates.add(p);
			}
		}
		return noDuplicates;
	}

	// converts an array of java plan objects to JSON format
	// outputs to testPlans.json
	// confirm output is correct before overwriting plans.json
	private static void convertToJSON(ArrayList<Plan> objects) throws IOException {
		BufferedWriter out = null;
		try {
			FileWriter fstream = new FileWriter("../../web/src/assets/testPlans.json");
		    out = new BufferedWriter(fstream);
		    out.write("[\n");
		    for (int j = 0; j < objects.size(); j++) {
		    	Plan obj = objects.get(j);
		    	out.write("\t{\n");
		    	out.write("\t\t\"shortName\": \"" + obj.shortName + "\",\n");
		    	out.write("\t\t\"longName\": \"" + obj.longName + "\",\n");
		    	out.write("\t\t\"courseList\": [\n");
		    	for (int i = 0; i < obj.courseList.size(); i++) {
		    		out.write("\t\t\t{ \"name\": \"" + obj.courseList.get(i).name + "\", ");
		    		out.write("\"requirement\": \"" + obj.courseList.get(i).requirement + "\" }");
//		    		out.write("\"requirement\": \"" + obj.courseList.get(i).requirement + "\", ");
//					out.write("\"unit\": \"" + obj.courseList.get(i).unit + "\", ");
//					out.write("\"description\": \"" + obj.courseList.get(i).description + "\" }");
		    		if (i != obj.courseList.size() - 1) {
		    			out.write(",");
		    		}
		    		out.write("\n");
		    	}
		    	out.write("\t\t]\n\t}");
		    	if (j != objects.size() - 1) {
		    		out.write(",");
		    	}
		    	out.write("\n");
		    }
		    out.write("]");
		}

		catch (IOException e) {
		    System.err.println("Error: " + e.getMessage());
		}

		finally {
		    if(out != null) {
		        out.close();
		    }
		}
	}
	
	private static class Plan {
		private String shortName;
		private String longName;
		private ArrayList<Course> courseList;
		
		Plan(String shortName, String longName, ArrayList<Course> courseList) {
			setShortName(shortName);
			setLongName(longName);
			setCourseList(courseList);
		}

		private void setCourseList(ArrayList<Course> courseList) {
			this.courseList = courseList;
		}

		private void setLongName(String longName) {
			this.longName = longName;
		}

		private void setShortName(String shortName) {
			this.shortName = shortName;
		}
		@Override
		public boolean equals(Object o) {
			return this.shortName.equals(((Plan) o).shortName) && this.longName.equals(((Plan) o).longName);
		}
	}
	
	private static class Course {
		private String name;
		private String requirement;
		private short unit;
		private String description;
		
		Course(String name, String requirement, short unit, String description) {
			setName(name);
			setRequirement(requirement);
			setUnit(unit);
			setDescription(description);
		}
		
		Course(String name, String requirement) {
			setName(name);
			setRequirement(requirement);
		}

		private void setName(String name) {
			this.name = name;
		}

		private void setRequirement(String requirement) {
			this.requirement = requirement;
		}

		private void setUnit(short unit) {
			this.unit = unit;
		}

		private void setDescription(String description) {
			this.description = description;
		}
		
		@Override
		public boolean equals(Object o) {
			return this.name.equals(((Course) o).name) && this.requirement.equals(((Course) o).requirement);
		}

	}
	
	private static class MultiReq {
		private String name;
		private ArrayList<Course> list = new ArrayList<Course>();

		MultiReq(String name, ArrayList<Course> list) {
			this.name = name;
			this.list = list;
		}

		public String getName() {
			return this.name;
		}
		
		@Override
		public boolean equals(Object o) {
			return this.name.equals(((MultiReq) o).getName());
		}
		
	}

}