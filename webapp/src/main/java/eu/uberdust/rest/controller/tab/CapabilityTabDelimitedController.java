package eu.uberdust.rest.controller.tab;

import eu.uberdust.caching.Loggable;
import eu.uberdust.command.CapabilityCommand;
import eu.uberdust.formatter.TextFormatter;
import eu.uberdust.formatter.exception.NotImplementedException;
import eu.uberdust.rest.exception.CapabilityNotFoundException;
import eu.uberdust.rest.exception.InvalidTestbedIdException;
import eu.uberdust.rest.exception.TestbedNotFoundException;
import eu.wisebed.wisedb.controller.CapabilityController;
import eu.wisebed.wisedb.controller.LastLinkReadingController;
import eu.wisebed.wisedb.controller.LastNodeReadingController;
import eu.wisebed.wisedb.controller.TestbedController;
import eu.wisebed.wisedb.model.Capability;
import eu.wisebed.wisedb.model.LastLinkReading;
import eu.wisebed.wisedb.model.LastNodeReading;
import eu.wisebed.wisedb.model.Testbed;
import org.apache.log4j.Logger;
import org.springframework.validation.BindException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractRestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;
import java.util.List;

/**
 * Controller class that returns readings of a specific capability in a tab delimited format.
 */
public final class CapabilityTabDelimitedController extends AbstractRestController {

    /**
     * Testbed persistence manager.
     */
    private transient TestbedController testbedManager;

    /**
     * Capability persistence manager.
     */
    private transient CapabilityController capabilityManager;

    /**
     * Last node reading persistence manager.
     */
    private transient LastNodeReadingController lastNodeReadingManager;

    /**
     * Last link reading persistence manager.
     */
    private transient LastLinkReadingController lastLinkReadingManager;

    /**
     * Logger.
     */
    private static final Logger LOGGER = Logger.getLogger(CapabilityTabDelimitedController.class);

    /**
     * Constructor.
     */
    public CapabilityTabDelimitedController() {
        super();

        // Make sure to set which method this controller will support.
        this.setSupportedMethods(new String[]{METHOD_GET});
    }

    /**
     * Sets testbed persistence manager.
     *
     * @param testbedManager testbed persistence manager.
     */
    public void setTestbedManager(final TestbedController testbedManager) {
        this.testbedManager = testbedManager;
    }

    /**
     * Sets capability persistence manager.
     *
     * @param capabilityManager capability persistence manager.
     */
    public void setCapabilityManager(final CapabilityController capabilityManager) {
        this.capabilityManager = capabilityManager;
    }

    /**
     * Sets last node reading persistence manager.
     *
     * @param lastNodeReading last node reading persistence manager.
     */
    public void setLastNodeReadingManager(final LastNodeReadingController lastNodeReading) {
        this.lastNodeReadingManager = lastNodeReading;
    }

    /**
     * Sets last link reading persistence manager.
     *
     * @param lastLinkReading last link reading persistence manager.
     */
    public void setLastLinkReadingManager(final LastLinkReadingController lastLinkReading) {
        this.lastLinkReadingManager = lastLinkReading;
    }


    /**
     * Handle Request and return the appropriate response.
     *
     * @param request    http servlet request.
     * @param response   http servlet response.
     * @param commandObj command object.
     * @param errors     BindException exception.
     * @return response http servlet response.
     * @throws InvalidTestbedIdException   a InvalidTestbedIdException exception.
     * @throws TestbedNotFoundException    a TestbedNotFoundException exception.
     * @throws IOException                 an IOException exception.
     * @throws CapabilityNotFoundException a CapabilityNotFoundException exception.
     */
    @Loggable
    protected ModelAndView handle(final HttpServletRequest request, final HttpServletResponse response,
                                  final Object commandObj, final BindException errors)
            throws InvalidTestbedIdException, TestbedNotFoundException, IOException, CapabilityNotFoundException {

        // set command object
        final CapabilityCommand command = (CapabilityCommand) commandObj;

        // a specific testbed is requested by testbed Id
        int testbedId;
        try {
            testbedId = Integer.parseInt(command.getTestbedId());

        } catch (NumberFormatException nfe) {
            throw new InvalidTestbedIdException("Invalid Testbed ID.", nfe);
        }

        // look up testbed
        final Testbed testbed = testbedManager.getByID(Integer.parseInt(command.getTestbedId()));
        if (testbed == null) {
            // if no testbed is found throw exception
            throw new TestbedNotFoundException("Cannot find testbed [" + testbedId + "].");
        }

        // look up capability
        final Capability capability = capabilityManager.getByID(command.getCapabilityName());
        if (capability == null) {
            // if no capability is found throw exception
            throw new CapabilityNotFoundException("Cannot find capability [" + command.getCapabilityName() + "].");
        }

        // write on the HTTP response
        response.setContentType("text/plain");
        final Writer textOutput = (response.getWriter());

        final List<LastNodeReading> lnrs = lastNodeReadingManager.getByCapability(testbed.getSetup(), capability);
        final List<LastLinkReading> llrs = lastLinkReadingManager.getByCapability(testbed.getSetup(), capability);
        try {
            textOutput.append(TextFormatter.getInstance().formatLastReadings(lnrs, llrs));
        } catch (NotImplementedException e) {
            textOutput.append("not implemented exception");
        }

        // flush close output
        textOutput.flush();
        textOutput.close();

        return null;
    }
}
