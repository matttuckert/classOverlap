package scrape;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.DomElement;
import com.gargoylesoftware.htmlunit.html.DomNode;
import com.gargoylesoftware.htmlunit.html.DomNodeList;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

public class Scrape {

	public static void main(String[] args) throws IOException, InterruptedException {
		
		ArrayList<Plan> objects = new ArrayList<Plan>();
		HtmlPage page;
		HtmlPage requirementsPage;
	    final WebClient webClient = new WebClient();
	    
	    page = webClient.getPage("https://www.acs.ncsu.edu/php/coursecat/degree_requirements.php");
	    webClient.waitForBackgroundJavaScript(500);
	    
	    DomNodeList<DomNode> panels = page.querySelectorAll(".panel");
	    for (DomNode panel : panels) {
	    	DomNode drop = panel.querySelector("[data-parent=\"#degrees\"]");
	    	((DomElement) drop).click();
	    	DomNodeList<DomNode> plans = panel.querySelectorAll(".requirement-link");
	    	for (DomNode plan : plans) {
	    		Plan obj;
	    		String shortName;
	    		String longName;
	    		ArrayList<String> courseList = new ArrayList<String>();
	    		requirementsPage = ((DomElement) plan).click();
	    		webClient.waitForBackgroundJavaScript(1000);
	    		DomNodeList<DomNode> courses = requirementsPage.querySelectorAll(".course-link");
	    		for (DomNode course : courses) {
	    			String longCourse = course.asText();
	    			courseList.add(longCourse.substring(0, longCourse.indexOf("-")).replaceAll("\\s",""));
	    		}
	    		String name = requirementsPage.querySelector("#plan-name-heading>p").asText();
	    		shortName = name.substring(name.indexOf("(") + 1, name.indexOf(")"));
	    		longName = name.substring(0, name.indexOf("("));
	    		obj = new Plan(shortName, longName, courseList);
	    		
	    		// Verify Object is added correctly

	    		// Done Verifying
	    		
	    		objects.add(obj);
	    	}
	    }
	    for (Plan object : objects) {
	    	System.out.println(object.longName);
	    }
	    webClient.close();
	}
	
	private static class Plan {
		private String shortName;
		private String longName;
		private ArrayList<String> courseList;
		
		Plan(String shortName, String longName, ArrayList<String> courseList) {
			setShortName(shortName);
			setLongName(longName);
			setCourseList(courseList);
		}

		private void setCourseList(ArrayList<String> courseList) {
			this.courseList = courseList;
		}

		private void setLongName(String longName) {
			this.longName = longName;
		}

		private void setShortName(String shortName) {
			this.shortName = shortName;
		}
	}
	
}
